# ECHO VedaAI - Agentic Multimodal Cognitive Intelligence

An AI-powered platform for medicinal plant recognition, AYUSH therapy recommendations, and herbal wellness.
• Artificial Intelligence
• Machine Learning / Deep Learning
• Computer Vision
• Full-Stack Development
• AYUSH-based healthcare systems
• Geographical, soil, and climate-based recommendation systems

 **Problem Statement**


 
Existing plant-recognition systems are limited to single-image input and static information
retrieval. They cannot analyse plant health, consider the user's geographic or personal
context, retrieve knowledge from a structured AYUSH source base, ground responses in
verifiable citations, or orchestrate multiple AI capabilities for complex queries. The central
problem is: How can computer vision, deep learning, multimodal AI, RAG, LLMs, agentic
workflows, environmental intelligence, and personalisation be integrated into a unified
system capable of medicinal-plant recognition, plant-health analysis, and personalised,
source-grounded AYUSH herbal wellness information? The research gap is not the absence
of AI in the plant domain but the lack of an integrated framework combining all these
capabilities within the specific AYUSH context


**Project Objectives**

1. YOLOv8-Based Plant Recognition: Fine-tune YOLOv8 on AYUSH-relevant
medicinal plant images for accurate real-time identification.
2. Plant Health Analysis: Develop a model to detect visible disease, stress, or
abnormality indicators alongside species identification.
3. AYUSH Knowledge Base: Curate a structured knowledge base of traditional uses,
preparation methods, precautions, and contraindications from authoritative AYUSH
sources.
4. RAG-Based Retrieval: Implement a RAG pipeline using sentence embeddings and a
vector database (FAISS/ChromaDB) for semantic knowledge retrieval.
5. LLM Cognitive Reasoning: Integrate an LLM to synthesise retrieved knowledge,
recognition results, and user context into coherent, source-grounded responses.
6. Agentic Tool Orchestration: Build an AI-agent layer that dynamically selects and
invokes tools (Vision, RAG, Environmental, Safety) in a controlled workflow.
7. Environmental Intelligence: Integrate weather, climate, and location APIs to provide
contextually enriched cultivation and availability information

## Project Structure

```
herb/
├── frontend/          # React + Vite frontend application
│   ├── src/
│   │   ├── components/   # React components (Navbar, Hero, PlantScanner, etc.)
│   │   ├── data/         # Static data (plant database)
│   │   └── assets/       # Images and static assets
│   ├── public/           # Public static files
│   ├── index.html        # Entry HTML
│   ├── vite.config.js    # Vite configuration
│   └── package.json      # Frontend dependencies
│
├── backend/           # Backend server (future)
│   └── README.md
│
└── README.md          # This file
```

## Getting Started

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Then open **http://localhost:5173/** in your browser.

### Backend

Backend is not yet implemented. See `backend/README.md` for planned features.

