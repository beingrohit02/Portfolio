/**
 * CityPulse AI Priority Scoring Engine & Utility Functions
 * Author: Rohit (AI Developer & B.Tech CSE AI&DS Student)
 */

export interface IncidentInput {
  type: 'multi_vehicle_collision' | 'pedestrian_hazard' | 'signal_outage' | 'heavy_waterlogging' | 'gridlock';
  severityWeight: number; // 1 to 10
  vehicleDensity: number; // 0.0 to 1.0 (density ratio)
  hospitalCorridorProximityKm: number; // distance in km
  emergencyVehicleEnRoute?: boolean;
}

export interface PriorityEvaluation {
  score: number; // 0 - 100
  tier: 'CRITICAL' | 'HIGH' | 'ELEVATED' | 'ROUTINE';
  urgencyLevel: number; // 1 to 5
  recommendedAction: string;
  dispatchSuggested: boolean;
  signalAdjustmentSuggested: boolean;
}

/**
 * Calculates priority score for CityPulse AI Urban Command & Control
 */
export function calculateIncidentPriority(incident: IncidentInput): PriorityEvaluation {
  // Base weight by incident type
  const baseTypeWeights: Record<IncidentInput['type'], number> = {
    multi_vehicle_collision: 45,
    pedestrian_hazard: 40,
    signal_outage: 25,
    heavy_waterlogging: 20,
    gridlock: 15,
  };

  const base = baseTypeWeights[incident.type] || 20;

  // Severity multiplier (scaled 1-10 -> 0-30 points)
  const severityPoints = Math.min(Math.max(incident.severityWeight, 1), 10) * 3;

  // Vehicle density impact (0-15 points)
  const densityPoints = Math.min(Math.max(incident.vehicleDensity, 0), 1) * 15;

  // Hospital corridor penalty: if < 2km from emergency corridor, urgency spikes up to +15 pts
  let proximityUrgency = 0;
  if (incident.hospitalCorridorProximityKm <= 1.0) {
    proximityUrgency = 15;
  } else if (incident.hospitalCorridorProximityKm <= 3.0) {
    proximityUrgency = 8;
  } else if (incident.hospitalCorridorProximityKm <= 5.0) {
    proximityUrgency = 4;
  }

  // Raw score clamped to 1-100
  let rawScore = Math.round(base + severityPoints + densityPoints + proximityUrgency);
  if (incident.emergencyVehicleEnRoute) {
    rawScore = Math.min(100, rawScore + 10);
  }
  const score = Math.min(100, Math.max(1, rawScore));

  // Determine Tier
  let tier: PriorityEvaluation['tier'] = 'ROUTINE';
  let urgencyLevel = 1;
  let recommendedAction = 'Log incident into traffic telemetry database.';
  let dispatchSuggested = false;
  let signalAdjustmentSuggested = false;

  if (score >= 80) {
    tier = 'CRITICAL';
    urgencyLevel = 5;
    recommendedAction = 'Immediate multi-agency emergency response dispatch and green-wave corridor activation.';
    dispatchSuggested = true;
    signalAdjustmentSuggested = true;
  } else if (score >= 60) {
    tier = 'HIGH';
    urgencyLevel = 4;
    recommendedAction = 'Dispatch field traffic wardens and trigger automated dynamic rerouting alert.';
    dispatchSuggested = true;
    signalAdjustmentSuggested = true;
  } else if (score >= 40) {
    tier = 'ELEVATED';
    urgencyLevel = 3;
    recommendedAction = 'Engage adaptive signal cycle extension (+25s) on primary arterial route.';
    dispatchSuggested = false;
    signalAdjustmentSuggested = true;
  } else {
    tier = 'ROUTINE';
    urgencyLevel = 2;
    recommendedAction = 'Monitor video stream via edge YOLO inference; standard signal cadence.';
    dispatchSuggested = false;
    signalAdjustmentSuggested = false;
  }

  return {
    score,
    tier,
    urgencyLevel,
    recommendedAction,
    dispatchSuggested,
    signalAdjustmentSuggested,
  };
}

/**
 * Filter projects by tech category or search text
 */
export function filterProjects<T extends { title: string; category: string; tags: string[]; description: string }>(
  items: T[],
  categoryFilter: string,
  searchQuery: string = ''
): T[] {
  const query = searchQuery.trim().toLowerCase();

  return items.filter((item) => {
    const matchesCategory =
      categoryFilter === 'all' || item.category.toLowerCase() === categoryFilter.toLowerCase();
    
    if (!matchesCategory) return false;

    if (!query) return true;

    return (
      item.title.toLowerCase().includes(query) ||
      item.description.toLowerCase().includes(query) ||
      item.tags.some((t) => t.toLowerCase().includes(query))
    );
  });
}

/**
 * Simulated RAG Query Response Generator
 */
export function queryKnowledgeBase(query: string): {
  topConfidence: number;
  retrievedContext: string;
  sourceDoc: string;
  synthesizedAnswer: string;
} {
  const q = query.toLowerCase();

  if (q.includes('signal') || q.includes('traffic') || q.includes('congestion')) {
    return {
      topConfidence: 0.94,
      sourceDoc: 'Standard Operating Procedures: Urban Traffic Signal Protocol §4.2',
      retrievedContext:
        'When intersection congestion index exceeds 0.78 for >4 minutes, CityPulse dynamically initiates adaptive 120-second cycle length with priority green window for emergency vehicles.',
      synthesizedAnswer:
        'CityPulse AI monitors intersection queue depth via YOLOv8 and triggers adaptive phase offsets. In event of high density, it overrides preset timers to clear bottleneck corridors.',
    };
  }

  if (q.includes('hospital') || q.includes('ambulance') || q.includes('emergency')) {
    return {
      topConfidence: 0.98,
      sourceDoc: 'Emergency Vehicle Preemption (EVP) Manual v2.1',
      retrievedContext:
        'Emergency preemption requests broadcast beacon telemetry to signal controllers along the 3km radius corridor to hold opposing red and provide sustained green signals.',
      synthesizedAnswer:
        'The priority scoring engine assigns a +15 point weight to incidents along designated hospital corridors, automatically initiating EVP green corridors across downstream junctions.',
    };
  }

  if (q.includes('yolo') || q.includes('vision') || q.includes('camera') || q.includes('detect')) {
    return {
      topConfidence: 0.92,
      sourceDoc: 'Edge Computer Vision Architecture Specs (YOLOv8 Nano/Small)',
      retrievedContext:
        'Edge camera streams are parsed at 30 FPS using TensorRT-accelerated YOLO models, outputting bounding boxes for vehicles, pedestrians, cyclists, and stationary debris.',
      synthesizedAnswer:
        'Computer vision inference runs on localized edge processors, detecting stopped vehicles, accidents, and pedestrian jaywalking in real time with ~28ms latency per frame.',
    };
  }

  return {
    topConfidence: 0.88,
    sourceDoc: 'CityPulse AI Architecture Whitepaper — Multi-Agent Coordination',
    retrievedContext:
      'The unified platform bridges real-time sensor streams, vector embeddings for municipal regulations, and human-in-the-loop validation dashboards.',
    synthesizedAnswer:
      'CityPulse connects municipal dispatchers with real-time AI reasoning, reducing mean time to emergency dispatch by up to 42% through automated triage scoring.',
  };
}
