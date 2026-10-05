// Sample demo prescriptions for presentation and instant testing

export const DEMO_PRESCRIPTIONS = [
  {
    id: 'demo-1',
    title: 'Gastrointestinal & Metabolic Rx',
    subtitle: 'Printed Prescription • 2 Medicines',
    badge: 'Printed',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80',
    description: 'Standard outpatient prescription containing acid reducer and blood sugar management medication.',
    medicines: [
      {
        id: 'm-1',
        name: 'Pantoprazole',
        strength: '40 mg',
        dosage: '1 Tablet',
        frequency: 'Once daily before breakfast (OD)',
        duration: '14 days',
        instructions: 'Take 30 mins before morning meal',
        isHandwritten: false,
        confidence: 98,
        needsConfirmation: false,
      },
      {
        id: 'm-2',
        name: 'Metformin Hydrochloride',
        strength: '500 mg',
        dosage: '1 Tablet',
        frequency: 'Twice daily after meals (BD)',
        duration: '30 days',
        instructions: 'Take with food to minimize GI distress',
        isHandwritten: false,
        confidence: 95,
        needsConfirmation: false,
      }
    ]
  },
  {
    id: 'demo-2',
    title: 'Cardiovascular & Lipid Rx',
    subtitle: 'Printed Prescription • High-Risk Medication Warning',
    badge: 'High-Risk Guardrail',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&auto=format&fit=crop&q=80',
    description: 'Prescription containing blood pressure and cholesterol lowering drugs demonstrating high-risk safety protocols.',
    medicines: [
      {
        id: 'm-3',
        name: 'Amlodipine Besylate',
        strength: '5 mg',
        dosage: '1 Tablet',
        frequency: 'Once daily at bedtime (HS)',
        duration: '30 days',
        instructions: 'Monitor blood pressure weekly',
        isHandwritten: false,
        confidence: 96,
        needsConfirmation: false,
      },
      {
        id: 'm-4',
        name: 'Atorvastatin Calcium',
        strength: '10 mg',
        dosage: '1 Tablet',
        frequency: 'Once daily at night (HS)',
        duration: '30 days',
        instructions: 'Avoid grapefruit juice',
        isHandwritten: false,
        confidence: 92,
        needsConfirmation: false,
      }
    ]
  },
  {
    id: 'demo-3',
    title: 'Handwritten General Outpatient Rx',
    subtitle: 'Handwritten • Includes Uncertain Detection Flag',
    badge: 'Handwritten (Uncertainty Flag)',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&auto=format&fit=crop&q=80',
    description: 'Handwritten prescription testing AI OCR detection, handwriting recognition, and user confirmation step.',
    medicines: [
      {
        id: 'm-5',
        name: 'Paracetamol',
        strength: '650 mg',
        dosage: '1 Tablet',
        frequency: 'Thrice daily as needed (TID)',
        duration: '5 days',
        instructions: 'Take after meals for fever/pain',
        isHandwritten: true,
        confidence: 94,
        needsConfirmation: false,
      },
      {
        id: 'm-6',
        name: 'Amoxicillin Trihydrate',
        strength: '500 mg',
        dosage: '1 Capsule',
        frequency: 'Thrice daily (TID)',
        duration: '7 days',
        instructions: 'Complete full antibiotic course',
        isHandwritten: true,
        confidence: 64,
        needsConfirmation: true,
        note: '⚠️ Uncertain handwriting: Could be Amoxicillin 500mg or Ampicillin 500mg. Please confirm with physical prescription.'
      }
    ]
  }
];
