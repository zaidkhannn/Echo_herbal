# ECHO VedaAI - Agentic Multimodal Cognitive Intelligence

[![Live Demo on Vercel](https://img.shields.io/badge/Live_Deployment-Vercel-117556?style=for-the-badge&logo=vercel&logoColor=white)](https://echo-herbal.vercel.app)
[![GitHub Repository](https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/zaidkhannn/Echo_herbal)

> **🚀 Live Web Application:** https://frontend-phi-murex-u914stz6qf.vercel.app/

An AI-powered platform bridging traditional AYUSH healthcare systems (Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy) with modern clinical artificial intelligence, computer vision, and evidence-grounded decision support.

---

## 🌟 Core Features

### 📋 1. AI Prescription Scanner & Clinical Evidence Pipeline (Rx Scanner)
Upload handwritten or printed doctor prescriptions to extract prescribed medications, verify therapeutic purposes, and explore evidence-backed Ayurvedic herbal alternatives.

- **Vision OCR Drug Extraction**: Leverages multimodal AI vision to accurately detect medicine names, strengths, dosages, frequencies, and durations.
- **5-Stage 8-Second Verification Pipeline**:
  1. *Document Preprocessing & Contrast Enhancement*
  2. *Vision OCR Medicine & Handwriting Recognition*
  3. *Active Generic Identity & Pharmacological Class Mapping*
  4. *AYUSH Monograph & PubMed Clinical Evidence Retrieval*
  5. *Herb-Drug Interaction Analysis & Safety Guardrails Check*
- **Evidence Hierarchy (Levels 1–5)**: Grounds all recommendations in peer-reviewed clinical trials, systematic reviews, and authoritative AYUSH pharmacopoeial monographs.
- **High-Risk Medication Guardrails**: Automatically detects high-risk medications (cardiovascular, anticoagulants, insulin, antiepileptics) and enforces strict non-substitution clinical directives.
- **Interactive Tools**: One-click demo prescriptions, manual medicine parameter adjustment, direct PubMed citation viewer modals, and printable clinical reports.

---

### 🌿 2. AI Plant Scanner
- Instant computer vision identification of medicinal plants from photos or live camera.
- Detailed AYUSH medicinal profiles including Sanskrit names, active chemical constituents, rasapanchaka (taste, potency, post-digestive effect), and therapeutic indications.
- Visible plant stress, health indicators, and cultivation guidance.

---

### 📚 3. 500+ Plant AYUSH Encyclopedia
- Searchable botanical database covering medicinal herbs across Ayurvedic, Siddha, and Unani classifications.
- Formulations, traditional preparation methods (Kwatha, Churna, Taila, Asava), safety profiles, and clinical contraindications.

---

### 🌱 4. Interactive Virtual Garden
- Digital garden to track, cultivate, and learn about medicinal plants.
- Growth stages, watering/sunlight requirements, soil conditions, and harvesting instructions.

---

### 💊 5. Personalized Therapy Guide
- Symptom-based AYUSH therapy builder with customized dietary recommendations, lifestyle protocols (Dinacharya & Ritucharya), and herbal remedy suggestions.

---

### 🧘 6. Dosha Assessment Quiz (Prakriti Analysis)
- Interactive clinical questionnaire to calculate individual Vata, Pitta, and Kapha constitution ratios.
- Personalized balancing advice, dosha-specific nutrition plans, and daily routine guidelines.

---

## 🧠 Problem Statement & Research Objectives

### Problem Statement
Existing plant-recognition and herbal systems are limited to single-image input and static information retrieval. They cannot analyze plant health, consider the user's geographic or personal context, retrieve knowledge from a structured AYUSH source base, ground responses in verifiable citations, or orchestrate multiple AI capabilities for complex queries. 

ECHO VedaAI integrates computer vision, deep learning, multimodal AI, RAG, LLMs, agentic workflows, environmental intelligence, and personalization into a unified system capable of medicinal-plant recognition, prescription analysis, and personalized, source-grounded AYUSH herbal wellness information.

### Project Objectives
1. **YOLOv8 & Multimodal Vision**: Fine-tune vision models on AYUSH-relevant medicinal plant images and prescription documents for accurate real-time identification.
2. **Plant Health Analysis**: Detect visible disease, stress, or abnormality indicators alongside species identification.
3. **Prescription Scanner & Evidence Engine**: Extract active pharmaceutical ingredients from prescriptions, match therapeutic classes, and evaluate evidence-backed herbal alternatives with strict interaction safety guardrails.
4. **AYUSH Knowledge Base**: Curate a structured knowledge base of traditional uses, preparation methods, precautions, and contraindications from authoritative AYUSH sources (API, CCRAS, PCIM&H, WHO monographs).
5. **RAG-Based Retrieval**: Implement a RAG pipeline using sentence embeddings and vector databases for semantic knowledge retrieval.
6. **LLM Cognitive Reasoning**: Synthesize retrieved knowledge, recognition results, and user context into coherent, source-grounded responses.
7. **Agentic Tool Orchestration**: Build an AI-agent layer that dynamically selects and invokes tools (Vision, RAG, Environmental, Safety) in a controlled workflow.
8. **Environmental Intelligence**: Integrate weather, climate, and location APIs to provide contextually enriched cultivation and availability information.

---

## 🏗️ Project Structure

```
herb/
├── frontend/                # React 18 + Vite frontend application
│   ├── src/
│   │   ├── components/     # UI Components (PrescriptionScanner, PlantScanner, Garden, etc.)
│   │   ├── data/           # Plant encyclopedias, demo prescriptions, therapies
│   │   ├── services/       # Groq AI Vision, OCR & evidence analysis pipelines
│   │   ├── index.css       # Design system tokens, glassmorphism & typography
│   │   └── App.jsx         # Routing & layout orchestrator
│   ├── public/             # Public static assets
│   ├── index.html          # HTML entry point with meta SEO
│   ├── vite.config.js      # Vite build configuration
│   └── package.json        # Frontend dependencies
│
├── backend/                 # Backend server (future API & RAG microservices)
│   └── README.md
│
├── package.json             # Root monorepo configuration
├── vercel.json              # Vercel production deployment configuration
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation & Local Setup

1. **Clone the repository:**
   ```bash
   git clone https://github.com/zaidkhannn/Echo_herbal.git
   cd Echo_herbal
   ```

2. **Install dependencies:**
   ```bash
   npm run install-all
   # or
   cd frontend && npm install
   ```

3. **Configure Environment Variables (Optional for Live Vision OCR):**
   Create a `.env` file in the `frontend/` directory:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```
   *(Note: The application includes offline and fallback evidence demo presets that work without an API key.)*

4. **Start the Development Server:**
   ```bash
   npm run dev
   # or from root
   cd frontend && npm run dev
   ```

---

## 🌐 Deployment (Vercel)

This project is configured for automated continuous deployment on Vercel:

- **Live URL:** [https://echo-herbal.vercel.app](https://echo-herbal.vercel.app)
- **Framework Preset:** Vite
- **Root Configuration:** `vercel.json` included with SPA routing fallback support.

---

## 🛡️ Clinical Safety & Ethical AI Directive

ECHO VedaAI provides evidence-backed research insights for **educational transparency and clinical decision support**. 
- The system **NEVER** instructs users to stop, reduce, or substitute prescribed medications independently.
- All high-risk medications (cardiovascular, diabetes, neurological) trigger automatic warning guardrails.
- Any therapeutic changes must be reviewed and approved by a licensed medical practitioner or prescribing physician.

---

## 📄 License
This project is open-source under the MIT License.
