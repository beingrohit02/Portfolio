import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateIncidentPriority,
  filterProjects,
  queryKnowledgeBase,
  type IncidentInput,
} from './priorityEngine';

test('calculateIncidentPriority returns CRITICAL tier for high-severity collision near hospital', () => {
  const incident: IncidentInput = {
    type: 'multi_vehicle_collision',
    severityWeight: 10,
    vehicleDensity: 0.9,
    hospitalCorridorProximityKm: 0.8,
    emergencyVehicleEnRoute: true,
  };

  const evalResult = calculateIncidentPriority(incident);

  assert.equal(evalResult.tier, 'CRITICAL');
  assert.equal(evalResult.dispatchSuggested, true);
  assert.equal(evalResult.signalAdjustmentSuggested, true);
  assert.ok(evalResult.score >= 80, `Expected score >= 80, got ${evalResult.score}`);
});

test('calculateIncidentPriority returns ROUTINE for low-impact gridlock far from hospital', () => {
  const incident: IncidentInput = {
    type: 'gridlock',
    severityWeight: 2,
    vehicleDensity: 0.3,
    hospitalCorridorProximityKm: 12.0,
  };

  const evalResult = calculateIncidentPriority(incident);

  assert.equal(evalResult.tier, 'ROUTINE');
  assert.equal(evalResult.dispatchSuggested, false);
  assert.ok(evalResult.score < 40, `Expected score < 40, got ${evalResult.score}`);
});

test('filterProjects correctly handles category and query filters', () => {
  const dummyProjects = [
    {
      title: 'CityPulse AI',
      category: 'computer_vision',
      tags: ['YOLO', 'FastAPI', 'RAG'],
      description: 'Smart city command center',
    },
    {
      title: 'DocuRAG',
      category: 'llm_rag',
      tags: ['LangChain', 'Ollama', 'Python'],
      description: 'Local document QA assistant',
    },
    {
      title: 'NeuroVision Inspector',
      category: 'computer_vision',
      tags: ['PyTorch', 'OpenCV'],
      description: 'Defect detection in manufacturing',
    },
  ];

  const cvOnly = filterProjects(dummyProjects, 'computer_vision');
  assert.equal(cvOnly.length, 2);

  const searched = filterProjects(dummyProjects, 'all', 'ollama');
  assert.equal(searched.length, 1);
  assert.equal(searched[0].title, 'DocuRAG');
});

test('queryKnowledgeBase returns contextual synthesis for traffic query', () => {
  const response = queryKnowledgeBase('How does signal timing change during high congestion?');
  assert.ok(response.topConfidence > 0.9);
  assert.match(response.sourceDoc, /Signal Protocol/);
  assert.ok(response.synthesizedAnswer.includes('CityPulse'));
});
