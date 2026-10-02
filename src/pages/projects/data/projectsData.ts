export interface TeamMember {
  name: string;
  role: string;
  photo: string;
  contribution: string;
  github: string;
  linkedin: string;
  skills: string[];
}

export interface ArchitectureStep {
  step: string;
  detail: string;
}

export interface SimulationSample {
  label: string;
  result: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  status: string;
  version: string;
  featured: boolean;
  thumbnail: string;
  bannerImage: string;
  tagline: string;
  executiveSummary: string;
  corePart: string;
  uses: string[];
  applications: string[];
  platform: string;
  languages: string[];
  frameworks: string[];
  metrics: {
    accuracy: string;
    latency: string;
    fps: string;
    payload: string;
    range: string;
    params: string;
  };
  githubUrl: string;
  liveDemoUrl: string;
  paperUrl?: string;
  docsUrl?: string;
  architectureSteps: ArchitectureStep[];
  codeSnippet: string;
  simulator: {
    type: string;
    promptLabel: string;
    samples: SimulationSample[];
  };
  teamPhoto: string;
  teamMembers: TeamMember[];
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "aeroscan-sentinel",
    title: "AeroScan Sentinel: Autonomous Search & Rescue Vision Drone",
    category: "Computer Vision",
    status: "Production Ready",
    version: "v2.4.1",
    featured: true,
    thumbnail: "/assets/images/projects/drone_vision.jpg",
    bannerImage: "/assets/images/projects/drone_vision.jpg",
    tagline: "Edge-computed real-time multi-agent aerial object detection & disaster terrain mapping.",
    executiveSummary: "AeroScan Sentinel is an autonomous UAV computer vision system engineered for emergency disaster response teams. Operating fully on-device without requiring continuous GPS or cloud connectivity, it detects survivors, collapses, and thermal anomalies in real-time, dispatching encrypted telemetry to field rescue units.",
    corePart: "Customized YOLOv10-Nano backbone quantized to INT8 with NVIDIA TensorRT, coupled with an optical-flow Kalman filter for robust object trajectory tracking across turbulent flight altitudes.",
    uses: [
      "Rapid post-earthquake search and rescue survivor localisation",
      "Dynamic wildfire perimeter monitoring and thermal hotspot tracking",
      "Avalanche beacon and human silhouette detection in high-glare snow terrain",
      "Infrastructure safety inspection of bridges, wind turbines, and power pylons"
    ],
    applications: [
      "National Disaster Response Forces (NDRF) reconnaissance deployments",
      "Municipal fire department autonomous scout fleets",
      "Wildlife park ranger anti-poaching nocturnal surveillance",
      "Offshore maritime search and rescue missions"
    ],
    platform: "NVIDIA Jetson Orin Nano (8GB) • PX4 Autopilot • ROS2 Humble • Ubuntu 22.04 LTS",
    languages: ["Python 3.11", "C++20", "CUDA C", "Shell / Bash"],
    frameworks: ["PyTorch 2.3", "TensorRT 10.0", "OpenCV 4.9", "FastAPI", "WebRTC", "Docker"],
    metrics: {
      accuracy: "98.7% mAP@50",
      latency: "21.4 ms",
      fps: "46.2 FPS on Edge",
      payload: "2.4 kg Payload",
      range: "12 km Flight Radius",
      params: "14.2M Weights"
    },
    githubUrl: "https://github.com/nexus-ai-club/aeroscan-sentinel",
    liveDemoUrl: "https://aeroscan-sentinel.demo.aiclub.edu",
    paperUrl: "https://arxiv.org/abs/sample-aeroscan-sentinel-2024",
    docsUrl: "https://docs.aeroscan.aiclub.edu",
    architectureSteps: [
      { step: "01. Dual-Spectral Ingestion", detail: "Synchronized 4K RGB sensor and FLIR Boson thermal camera streaming at 60 FPS via MIPI-CSI2." },
      { step: "02. Edge Preprocessing", detail: "Hardware-accelerated CUDA bilinear undistortion and contrast adaptive histogram equalization (CLAHE)." },
      { step: "03. TensorRT Tensor Inference", detail: "INT8 TensorRT execution of custom YOLOv10 backbone with spatial attention gates." },
      { step: "04. Spatial Localization & ROS2", detail: "3D ray-casting bounding boxes onto georeferenced DEM map tiles and broadcasting over MAVLink/ROS2." }
    ],
    codeSnippet: `# Jetson Orin Edge Inference Pipeline
import torch
import cv2
import tensorrt as trt
from aeroscan.engine import FlightVisionEngine, BoundingTracker

def run_telemetry_loop(video_stream_uri):
    engine = FlightVisionEngine(model_path="weights/yolov10_nano_int8.engine", device="cuda:0")
    tracker = BoundingTracker(iou_threshold=0.65, max_age_frames=30)
    
    cap = cv2.VideoCapture(video_stream_uri)
    while cap.isOpened():
        ret, frame = cap.read()
        if not ret: break
        
        detections = engine.detect_survivors(frame, conf_threshold=0.72)
        tracked_entities = tracker.update(detections, frame)
        
        for entity in tracked_entities:
            print(f"[RESCUE_ALERT] ID: {entity.id} | Class: {entity.label} | GPS: {entity.gps_coords}")
        
    cap.release()`,
    simulator: {
      type: "vision_detector",
      promptLabel: "Select Disaster Reconnaissance Video Frame:",
      samples: [
        { label: "Earthquake Debris Zone", result: "Survivor Detected (97.4%) at Lat 34.052, Lon -118.243. Structural Collapse Hazard flagged." },
        { label: "Wildfire Forest Edge", result: "Active Thermal Front Detected. Wind Propagation Vector: 14kt NE. Alert disptached to Engine 4." },
        { label: "Night Mountain Ridge", result: "Human Heat Signature identified (94.1%). Optical Strobe engaged. Drone holding hover coordinate." }
      ]
    },
    teamPhoto: "/assets/images/team/team_group.jpg",
    teamMembers: [
      {
        name: "Sarah Chen",
        role: "Lead ML & Computer Vision Engineer",
        photo: "/assets/images/team/sarah_chen.jpg",
        contribution: "Architected customized YOLOv10 feature pyramids, performed FP16 to INT8 post-training quantization, and reduced edge memory footprint by 42%.",
        github: "https://github.com/sarahchen-ai",
        linkedin: "https://linkedin.com/in/sarahchen-ml",
        skills: ["TensorRT", "CUDA", "PyTorch", "Model Pruning"]
      },
      {
        name: "Amara Okafor",
        role: "Robotics & Flight Control Lead",
        photo: "/assets/images/team/amara_okafor.jpg",
        contribution: "Developed the ROS2 Humble bridge for MAVLink protocol, integrated PX4 off-board flight modes, and conducted physical wind-tunnel flight trials.",
        github: "https://github.com/amara-okafor-robotics",
        linkedin: "https://linkedin.com/in/amara-okafor",
        skills: ["ROS2", "PX4 Autopilot", "C++", "Drone Avionics"]
      },
      {
        name: "Maya Patel",
        role: "Cloud Telemetry & Mission Control UI",
        photo: "/assets/images/team/maya_patel.jpg",
        contribution: "Designed low-latency WebRTC video streaming pipeline, telemetry geospatial mapping with Mapbox GL, and incident alert notification dispatchers.",
        github: "https://github.com/mayapatel-dev",
        linkedin: "https://linkedin.com/in/maya-patel-cloud",
        skills: ["WebRTC", "FastAPI", "TypeScript", "Docker"]
      },
      {
        name: "Liam Vance",
        role: "Synthetic Data & Testing Engineer",
        photo: "/assets/images/team/liam_vance.jpg",
        contribution: "Constructed photorealistic disaster simulations in Unreal Engine 5 to generate 150k annotated synthetic frames for corner-case flight validation.",
        github: "https://github.com/liamvance-tech",
        linkedin: "https://linkedin.com/in/liam-vance-ai",
        skills: ["Unreal Engine", "Blender", "Python", "Data Synthesis"]
      }
    ]
  },
  {
    id: "neuroscan-3d",
    title: "NeuroScan 3D: Holographic MRI Glioma Segmentation & Staging",
    category: "Healthcare AI",
    status: "Clinical Trial Validation",
    version: "v1.8.0",
    featured: true,
    thumbnail: "/assets/images/projects/biomed_ai.jpg",
    bannerImage: "/assets/images/projects/biomed_ai.jpg",
    tagline: "Sub-millimeter volumetric brain tumor segmentation with Bayesian uncertainty quantification.",
    executiveSummary: "NeuroScan 3D is a deep-learning diagnostic assistant designed for neuro-radiologists. It accepts multi-modal DICOM sequences (T1, T1-Contrast, T2, FLAIR) and segments necrotic core, active tumor border, and edema within seconds, rendering an interactive 3D volumetric model with pixel-level diagnostic confidence intervals.",
    corePart: "3D Attention nnU-Net ensemble trained with Monte Carlo Dropout for epistemic uncertainty visualization, reducing false positive tissue classification during neurosurgery planning.",
    uses: [
      "Pre-operative craniotomy tumor margin delineation",
      "Longitudinal tracking of chemotherapy tumor regression or recurrence",
      "Automated radiation therapy target volume contouring (GTV/CTV)",
      "Clinical trials standardized volumetric reporting (RANO criteria)"
    ],
    applications: [
      "Neurosurgery planning suites and surgical navigation monitors",
      "Tertiary care hospital oncology diagnostic departments",
      "Tele-radiology secondary opinion screening networks",
      "Biomedical research institutes evaluating novel oncology drugs"
    ],
    platform: "NVIDIA DGX A100 Station • Orthanc DICOM PACS • ONNX WebAssembly • HIPAA-ready Cloud",
    languages: ["Python 3.11", "TypeScript", "CUDA C", "GLSL Shaders"],
    frameworks: ["PyTorch 2.3", "MONAI", "SimpleITK", "Three.js", "FastAPI", "Nibabel"],
    metrics: {
      accuracy: "92.8% Dice Score",
      latency: "4.1 sec per 3D scan",
      fps: "60 FPS 3D Render",
      payload: "Sub-mm Precision",
      range: "4 Modal Ingestion",
      params: "38.7M Weights"
    },
    githubUrl: "https://github.com/nexus-ai-club/neuroscan-3d",
    liveDemoUrl: "https://neuroscan-glioma.demo.aiclub.edu",
    paperUrl: "https://arxiv.org/abs/sample-neuroscan-glioma-2024",
    docsUrl: "https://docs.neuroscan.aiclub.edu",
    architectureSteps: [
      { step: "01. Multi-Spectral Skull Stripping", detail: "Automated brain extraction (HD-BET) and affine co-registration onto SRI24 anatomical atlas." },
      { step: "02. N4 Bias Field Correction", detail: "Intensity non-uniformity normalization across MRI scanner hardware vendors." },
      { step: "03. 3D nnU-Net Deep Segmentation", detail: "Spatially separable 3D convolutions with squeeze-and-excitation attention blocks." },
      { step: "04. Volumetric Marching Cubes", detail: "GPU-driven surface reconstruction converting voxel probability volumes into interactive Three.js 3D meshes." }
    ],
    codeSnippet: `# 3D Volumetric Segmentation & Uncertainty
import torch
from monai.networks.nets import UNETR
from neuroscan.uncertainty import monte_carlo_dropout_inference

def segment_brain_volume(t1_path, flair_path):
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    model = UNETR(in_channels=4, out_channels=3, img_size=(128, 128, 128), feature_size=16).to(device)
    model.eval()
    
    mean_segmentation, uncertainty_map = monte_carlo_dropout_inference(model, t1_path, flair_path, passes=20)
    
    edema_vol = (mean_segmentation == 1).sum() * 0.001
    core_vol = (mean_segmentation == 2).sum() * 0.001
    
    return {
        "status": "COMPLETED",
        "edema_volume_cc": float(edema_vol),
        "necrotic_core_cc": float(core_vol),
        "mean_confidence": float(1.0 - uncertainty_map.mean())
    }`,
    simulator: {
      type: "biomed_analyzer",
      promptLabel: "Choose Clinical MRI Sequence to Analyze:",
      samples: [
        { label: "Patient #4082 - High-Grade Glioblastoma", result: "Segmented: Enhancing core (32.4 cm³), Edema margin (48.1 cm³). Dice Score: 93.4%. Confidence: 98.2%." },
        { label: "Patient #2190 - Low-Grade Astrocytoma", result: "Diffuse non-enhancing hyperintensity localized in right frontal lobe. No necrotic core detected." },
        { label: "Patient #9811 - Post-Chemo Followup", result: "Tumor volume contracted by 34.6% relative to baseline 90 days prior. Response: RANO Partial Remission." }
      ]
    },
    teamPhoto: "/assets/images/team/team_group.jpg",
    teamMembers: [
      {
        name: "Liam Vance",
        role: "Lead Deep Learning Architect",
        photo: "/assets/images/team/liam_vance.jpg",
        contribution: "Constructed the 3D transformer UNETR architecture, implemented test-time augmentation, and validated cross-dataset generalization on BraTS benchmarks.",
        github: "https://github.com/liamvance-tech",
        linkedin: "https://linkedin.com/in/liam-vance-ai",
        skills: ["PyTorch", "MONAI", "Medical AI", "Bayesian Inference"]
      },
      {
        name: "Sarah Chen",
        role: "Bio-Imaging Data Engineer",
        photo: "/assets/images/team/sarah_chen.jpg",
        contribution: "Engineered automated N4 bias field correction, DICOM metadata parser, and multi-sequence skull-stripping pipeline.",
        github: "https://github.com/sarahchen-ai",
        linkedin: "https://linkedin.com/in/sarahchen-ml",
        skills: ["SimpleITK", "DICOM", "Data Augmentation", "Python"]
      },
      {
        name: "Maya Patel",
        role: "Fullstack 3D Visualization Engineer",
        photo: "/assets/images/team/maya_patel.jpg",
        contribution: "Authored GPU WebGL Marching Cubes shaders rendering 3D volumetric tumors directly in modern web browsers at silky 60fps.",
        github: "https://github.com/mayapatel-dev",
        linkedin: "https://linkedin.com/in/maya-patel-cloud",
        skills: ["Three.js", "WebGL", "TypeScript", "React"]
      },
      {
        name: "Amara Okafor",
        role: "Clinical Compliance & QA Engineer",
        photo: "/assets/images/team/amara_okafor.jpg",
        contribution: "Handled HIPAA de-identification protocol verification and coordinated qualitative evaluation sessions with 4 radiologist consultants.",
        github: "https://github.com/amara-okafor-robotics",
        linkedin: "https://linkedin.com/in/amara-okafor",
        skills: ["HIPAA Compliance", "QA Pipelines", "CI/CD", "Docker"]
      }
    ]
  },
  {
    id: "veritas-deepfake",
    title: "Veritas AI: Real-Time DeepFake & Biometric Synthetic Sentinel",
    category: "Cybersecurity",
    status: "Beta Active",
    version: "v3.1.2",
    featured: true,
    thumbnail: "/assets/images/projects/deepfake_ai.jpg",
    bannerImage: "/assets/images/projects/deepfake_ai.jpg",
    tagline: "Multi-modal temporal artifact analyzer detecting synthetic video, lip-sync glitches & cloned audio.",
    executiveSummary: "Veritas AI protects digital identities and digital democracies against hyper-realistic AI deepfakes. Combining spatio-temporal video transformers with neural audio spectral analysis, it flags synthetic artifacts, GAN boundary anomalies, and voice-cloning phase incoherencies in sub-second streaming feeds.",
    corePart: "Dual-stream Spatio-Temporal Video Transformer evaluating biological micro-pulse signals (remote photoplethysmography / rPPG) fused with wav2vec 2.0 acoustic forensic probing.",
    uses: [
      "Financial KYC biometric identity verification safeguarding against spoof injection",
      "Executive video call protection against real-time voice and face cloning",
      "Social platform automated misinformation and viral deepfake detection",
      "Judicial digital evidence authentication and chain-of-custody validation"
    ],
    applications: [
      "Fintech neo-banks and crypto exchanges onboarding portals",
      "Newsrooms and investigative journalism media verification desks",
      "Enterprise cybersecurity Zoom/Teams security plugin integrations",
      "Government electoral oversight security commissions"
    ],
    platform: "Kubernetes Cluster • AWS Inferentia2 • Chrome Extension API • WebAssembly",
    languages: ["Python 3.11", "Rust", "Go", "TypeScript"],
    frameworks: ["PyTorch 2.3", "HuggingFace Transformers", "Librosa", "WebAssembly", "FastAPI"],
    metrics: {
      accuracy: "97.6% AUC Score",
      latency: "18.2 ms per frame",
      fps: "55 FPS Stream",
      payload: "rPPG Biometrics",
      range: "Audio + Video",
      params: "26.5M Weights"
    },
    githubUrl: "https://github.com/nexus-ai-club/veritas-sentinel",
    liveDemoUrl: "https://veritas-ai.demo.aiclub.edu",
    paperUrl: "https://arxiv.org/abs/sample-veritas-deepfake-2024",
    docsUrl: "https://docs.veritas.aiclub.edu",
    architectureSteps: [
      { step: "01. Facial Landmark Mesh Tracking", detail: "468-point 3D facial mesh extraction tracking micro-movements, saccades, and blink latency." },
      { step: "02. Remote Photoplethysmography (rPPG)", detail: "Isolating sub-surface capillary blood flow pulses across facial skin regions." },
      { step: "03. Spectral Phase Acoustic Audit", detail: "Short-Time Fourier Transform (STFT) uncovering neural vocoder high-frequency spectral roll-offs." },
      { step: "04. Bayesian Ensembled Verdict", detail: "Fusing visual anomaly scores with audio phoneme synchronization metrics to output probabilistic trust scores." }
    ],
    codeSnippet: `# Real-Time DeepFake Stream Sentinel
import torch
import numpy as np
from veritas.audio import SpectralAcousticSentinel
from veritas.vision import BiologicalRPPGDetector

class VeritasForensicPipeline:
    def __init__(self):
        self.rppg_engine = BiologicalRPPGDetector.load_pretrained()
        self.audio_engine = SpectralAcousticSentinel.load_pretrained()

    def inspect_frame_chunk(self, rgb_frames, audio_sample_rate, audio_wave):
        pulse_signal, pulse_confidence = self.rppg_engine.extract_pulse(rgb_frames)
        audio_verdict = self.audio_engine.detect_vocoder_signature(audio_wave, audio_sample_rate)
        
        is_synthetic = (pulse_confidence < 0.35) or (audio_verdict["synthetic_prob"] > 0.85)
        return {
            "is_synthetic": bool(is_synthetic),
            "threat_score": float(np.mean([1.0 - pulse_confidence, audio_verdict["synthetic_prob"]])),
            "flags": ["IRREGULAR_BLOOD_PULSE" if pulse_confidence < 0.35 else "ORGANIC_BLOOD_FLOW"]
        }`,
    simulator: {
      type: "forensic_scanner",
      promptLabel: "Select Candidate Media to Probe:",
      samples: [
        { label: "CEO Video Announcement (Cloned)", result: "THREAT ALERT: Probable DeepFake (96.8%). Lack of physiological rPPG pulse. Audio phase misalignment: 82ms." },
        { label: "Live Webcam Interview (Authentic)", result: "VERIFIED AUTHENTIC: Natural corneal micro-saccades confirmed. Biological cardiac pulse synced at 74 BPM." },
        { label: "Viral Social Clip (Diffusion Face Swap)", result: "SYNTHETIC ARTIFACTS: Boundary seam blending detected along jawline. Spectral frequency cut-off at 16kHz." }
      ]
    },
    teamPhoto: "/assets/images/team/team_group.jpg",
    teamMembers: [
      {
        name: "Liam Vance",
        role: "Lead Forensic AI Researcher",
        photo: "/assets/images/team/liam_vance.jpg",
        contribution: "Formulated the dual-stream spatiotemporal transformer and trained cross-generator classifiers resistant to image compression artifacts.",
        github: "https://github.com/liamvance-tech",
        linkedin: "https://linkedin.com/in/liam-vance-ai",
        skills: ["Deep Learning", "Forensics", "Transformers", "PyTorch"]
      },
      {
        name: "Maya Patel",
        role: "Streaming & Browser Engine Lead",
        photo: "/assets/images/team/maya_patel.jpg",
        contribution: "Developed the Rust WebAssembly module executing client-side landmark tracking inside Google Chrome with zero server latency.",
        github: "https://github.com/mayapatel-dev",
        linkedin: "https://linkedin.com/in/maya-patel-cloud",
        skills: ["Rust", "Wasm", "TypeScript", "Browser APIs"]
      },
      {
        name: "Sarah Chen",
        role: "Bio-Signal & Vision Engineer",
        photo: "/assets/images/team/sarah_chen.jpg",
        contribution: "Engineered the rPPG blood flow pulse estimator and facial illumination normalization algorithms.",
        github: "https://github.com/sarahchen-ai",
        linkedin: "https://linkedin.com/in/sarahchen-ml",
        skills: ["Signal Processing", "OpenCV", "rPPG", "Python"]
      },
      {
        name: "Amara Okafor",
        role: "Adversarial Stress Testing Lead",
        photo: "/assets/images/team/amara_okafor.jpg",
        contribution: "Curated an in-house benchmark dataset of 5,000 synthetic videos spanning Midjourney, Sora, and ElevenLabs voice clones.",
        github: "https://github.com/amara-okafor-robotics",
        linkedin: "https://linkedin.com/in/amara-okafor",
        skills: ["Red Teaming", "Dataset Engineering", "Linux", "PyTorch"]
      }
    ]
  },
  {
    id: "apexrover-robotics",
    title: "ApexRover: Quadruped Locomotion & Visual SLAM Navigation",
    category: "Robotics & RL",
    status: "Hardware Deployed",
    version: "v4.0.0",
    featured: true,
    thumbnail: "/assets/images/projects/robotics_ai.jpg",
    bannerImage: "/assets/images/projects/robotics_ai.jpg",
    tagline: "Deep reinforcement learning policy for dynamic rough-terrain traversal and LiDAR 3D mapping.",
    executiveSummary: "ApexRover is a cybernetic quadrupedal robotic system capable of autonomous navigation through unstructured, hazardous environments. Powered by neural locomotion policies trained through massively parallel GPU reinforcement learning, the rover scales stairs, overcomes sudden obstacles, and generates real-time 3D voxel point clouds for remote inspection.",
    corePart: "Proximal Policy Optimization (PPO) model trained across 4,096 parallel simulated robots in NVIDIA Isaac Gym with randomized domain friction, distilled to run on an onboard Jetson Orin NX.",
    uses: [
      "Chemical and petrochemical industrial plant autonomous thermal inspection",
      "Post-disaster hazardous collapsed building reconnaissance",
      "Underground mining and subterranean tunnel autonomous cartography",
      "Off-road planetary analog exploration testing for aerospace missions"
    ],
    applications: [
      "Industrial facility predictive maintenance teams",
      "Civil defense hazard containment squads",
      "Academic autonomous robotics research laboratories",
      "Agricultural high-canopy crop monitoring operations"
    ],
    platform: "Unitree Go2 Hardware • Jetson Orin NX • Velodyne VLP-16 LiDAR • ROS2 Iron",
    languages: ["C++20", "Python 3.11", "CUDA", "Modern CMake"],
    frameworks: ["NVIDIA Isaac Gym", "PyTorch", "ROS2 Iron", "Cartographer SLAM", "Foxglove"],
    metrics: {
      accuracy: "99.8% Recovery Rate",
      latency: "8.3 ms Control Loop",
      fps: "120 Hz Policy",
      payload: "5.0 kg Payload",
      range: "3.2 m/s Top Sprint",
      params: "8.4M Weights"
    },
    githubUrl: "https://github.com/nexus-ai-club/apexrover-locomotion",
    liveDemoUrl: "https://apexrover.demo.aiclub.edu",
    paperUrl: "https://arxiv.org/abs/sample-apexrover-robotics-2024",
    docsUrl: "https://docs.apexrover.aiclub.edu",
    architectureSteps: [
      { step: "01. Isaac Gym Massive Sim-to-Real", detail: "4,096 robots simulated simultaneously with randomized motor friction, leg mass, and terrain perturbations." },
      { step: "02. Teacher-Student Policy Distillation", detail: "Distilling privileged state history into an onboard sensor observation history vector." },
      { step: "03. 120Hz Motor Joint Impedance Loop", detail: "Real-time CAN-bus motor command synthesis maintaining balance across slippery terrain." },
      { step: "04. 3D LiDAR SLAM Cartography", detail: "Velodyne 16-channel point cloud registration using Cartographer for drift-free indoor mapping." }
    ],
    codeSnippet: `# Quadruped RL Control Loop (120 Hz Execution)
import torch
import numpy as np
from apexrover.hardware import UnitreeCANBusController
from apexrover.policy import DistilledLocomotionPolicy

def run_locomotion_thread():
    controller = UnitreeCANBusController(can_interface="can0")
    policy = DistilledLocomotionPolicy.load("weights/ppo_locomotion_distilled.pt")
    
    obs_buffer = np.zeros((1, 45), dtype=np.float32)
    rate_limiter = controller.create_timer(frequency_hz=120)
    
    while controller.is_alive():
        joint_states, imu_euler, lin_acc = controller.poll_sensors()
        obs_buffer = update_observation_history(obs_buffer, joint_states, imu_euler)
        
        with torch.no_grad():
            joint_actions = policy(torch.from_numpy(obs_buffer))
            
        target_positions = denormalize_joint_angles(joint_actions.numpy())
        controller.send_motor_torque_commands(target_positions, kp=40.0, kd=1.2)
        rate_limiter.sleep()`,
    simulator: {
      type: "robotics_telemetry",
      promptLabel: "Trigger Terrain Challenge for ApexRover:",
      samples: [
        { label: "35° Wooden Incline Ramp", result: "Policy shifted mass center forward. Foot slippage compensated in 12ms. Ascended at 1.4 m/s." },
        { label: "Dynamic Lateral Kick (Perturbation)", result: "Lateral impulse: 28 N·m. Gyro recovery triggered 2-step corrective hop. Zero fall recorded." },
        { label: "Obstacle-Dense Rubble Field", result: "High-stepping gait engaged. Foot clearance elevated to 14cm. SLAM mapped 240m² in 45 sec." }
      ]
    },
    teamPhoto: "/assets/images/team/team_group.jpg",
    teamMembers: [
      {
        name: "Amara Okafor",
        role: "Lead Robotics & Reinforcement Learning",
        photo: "/assets/images/team/amara_okafor.jpg",
        contribution: "Designed the Isaac Gym PPO reward formulation, sim-to-real transfer domain randomization, and real-time motor controller.",
        github: "https://github.com/amara-okafor-robotics",
        linkedin: "https://linkedin.com/in/amara-okafor",
        skills: ["Isaac Gym", "PPO / RL", "C++", "Robotics Dynamics"]
      },
      {
        name: "Liam Vance",
        role: "LiDAR SLAM & Perception Engineer",
        photo: "/assets/images/team/liam_vance.jpg",
        contribution: "Integrated the Velodyne LiDAR with Cartographer 3D SLAM, writing GPU point cloud noise filtering shaders.",
        github: "https://github.com/liamvance-tech",
        linkedin: "https://linkedin.com/in/liam-vance-ai",
        skills: ["SLAM", "LiDAR", "Point Clouds", "ROS2"]
      },
      {
        name: "Sarah Chen",
        role: "Vision-Language-Action (VLA) Lead",
        photo: "/assets/images/team/sarah_chen.jpg",
        contribution: "Implemented semantic object grounding allowing natural language voice commands to guide rover exploration targets.",
        github: "https://github.com/sarahchen-ai",
        linkedin: "https://linkedin.com/in/sarahchen-ml",
        skills: ["VLA Models", "Embeddings", "Python", "Computer Vision"]
      },
      {
        name: "Maya Patel",
        role: "Foxglove Telemetry UI & Cloud Link",
        photo: "/assets/images/team/maya_patel.jpg",
        contribution: "Created remote operator mission cockpit, 3D point cloud streaming over 5G mesh, and emergency e-stop safeguards.",
        github: "https://github.com/mayapatel-dev",
        linkedin: "https://linkedin.com/in/maya-patel-cloud",
        skills: ["Foxglove", "WebSockets", "TypeScript", "React"]
      }
    ]
  },
  {
    id: "neurokodex-ide",
    title: "NeuroKodex: Context-Aware AST Graph AI Pair Programmer",
    category: "NLP & LLMs",
    status: "Open Source Release",
    version: "v2.1.0",
    featured: true,
    thumbnail: "/assets/images/projects/code_llm.jpg",
    bannerImage: "/assets/images/projects/code_llm.jpg",
    tagline: "Graph neural network augmented LLM assistant for whole-codebase reasoning, automated refactoring & bug prevention.",
    executiveSummary: "NeuroKodex bridges language models with deep syntactic code analysis. Unlike standard copilot tools that merely look at adjacent lines, NeuroKodex indexes your entire repository into a bidirectional Abstract Syntax Tree (AST) graph, giving the LLM global architectural visibility across microservices, imports, and data schemas.",
    corePart: "Tree-sitter AST parser integrated with Neo4j graph embeddings and Code-Llama 34B fine-tuned via LoRA for multi-hop repository reasoning.",
    uses: [
      "Safe cross-file refactoring and automated API deprecation migration",
      "Repo-wide architectural security auditing and SQL/XSS vulnerability detection",
      "Automated unit test generation with 95%+ branch and mutation coverage",
      "Instant code explanation and natural language query across 500k+ LOC projects"
    ],
    applications: [
      "Enterprise software engineering organizations maintaining monorepos",
      "Open-source software foundations auditing security pull requests",
      "Software developer onboarding and architectural walkthroughs",
      "Automated code review bot pipelines in GitHub Actions"
    ],
    platform: "vLLM Inference Server • VS Code Extension API • Neo4j Database • Docker",
    languages: ["TypeScript", "Python 3.11", "Rust", "Cypher QL"],
    frameworks: ["vLLM", "Tree-sitter", "LangChain", "Neo4j", "PyTorch", "Electron"],
    metrics: {
      accuracy: "79.4% Pass@1 HumanEval+",
      latency: "32 ms First Token",
      fps: "42 Tok/s Local Gen",
      payload: "64k Token Context",
      range: "12 Languages",
      params: "34B Quantized"
    },
    githubUrl: "https://github.com/nexus-ai-club/neurokodex-ide",
    liveDemoUrl: "https://neurokodex.demo.aiclub.edu",
    paperUrl: "https://arxiv.org/abs/sample-neurokodex-ide-2024",
    docsUrl: "https://docs.neurokodex.aiclub.edu",
    architectureSteps: [
      { step: "01. Incremental Tree-sitter Parsing", detail: "Real-time AST generation parsing function definitions, calls, imports, and symbol scopes on keypress." },
      { step: "02. Graph Neural Embedding", detail: "Mapping code graph dependencies into Neo4j with semantic vector embeddings for cross-file linkage." },
      { step: "03. Context Assembly & Pruning", detail: "Extracting only relevant graph subtrees into the prompt to stay within lightning-fast attention windows." },
      { step: "04. Speculative Decoding Synthesis", detail: "Generating syntactic completions via draft model acceleration at over 40 tokens per second." }
    ],
    codeSnippet: `# AST Graph Query & Context Assembly
from tree_sitter import Language, Parser
from neurokodex.graph import RepoGraphEngine
from neurokodex.llm import StreamingCodeGenerator

def generate_architectural_fix(source_file, cursor_line):
    graph = RepoGraphEngine.get_instance()
    parser = Parser()
    
    ast_tree = parser.parse(source_file.read_bytes())
    impacted_symbols = graph.query_callers_of_node(ast_tree, cursor_line)
    
    prompt = f"""[SYS] You are NeuroKodex. Fix concurrency bug preserving: {impacted_symbols}
    [FILE: {source_file.name}]
    {source_file.read_snippet(cursor_line - 15, cursor_line + 15)}"""
    
    for token in StreamingCodeGenerator.stream_generate(prompt):
        yield token`,
    simulator: {
      type: "code_generator",
      promptLabel: "Select Codebase Refactor Challenge:",
      samples: [
        { label: "Convert Callback Hell to Async/Await", result: "Synthesized clean Promises with async/await. Resolved 3 unhandled rejection paths. 100% syntax check passed." },
        { label: "Audit SQL Injection in Query Builder", result: "VULNERABILITY CAUGHT: Line 48 uses string interpolation. Patched to parameterized prepared statement." },
        { label: "Generate PyTest with Mocked Redis", result: "Generated 6 unit tests with pytest fixtures, mock Redis cluster, and 98% mutation test coverage." }
      ]
    },
    teamPhoto: "/assets/images/team/team_group.jpg",
    teamMembers: [
      {
        name: "Maya Patel",
        role: "Lead Systems & Extension Architect",
        photo: "/assets/images/team/maya_patel.jpg",
        contribution: "Engineered the VS Code Language Server Protocol (LSP) client, bidirectional inline diff viewer, and syntax highlighting hooks.",
        github: "https://github.com/mayapatel-dev",
        linkedin: "https://linkedin.com/in/maya-patel-cloud",
        skills: ["TypeScript", "VS Code LSP", "Rust", "Architecture"]
      },
      {
        name: "Liam Vance",
        role: "LLM Fine-Tuning & Quantization",
        photo: "/assets/images/team/liam_vance.jpg",
        contribution: "Curated 1.2M instruction pairs for LoRA fine-tuning Code-Llama 34B and optimized inference with vLLM PagedAttention.",
        github: "https://github.com/liamvance-tech",
        linkedin: "https://linkedin.com/in/liam-vance-ai",
        skills: ["vLLM", "LoRA", "HuggingFace", "Python"]
      },
      {
        name: "Sarah Chen",
        role: "AST Graph & Parsing Engineer",
        photo: "/assets/images/team/sarah_chen.jpg",
        contribution: "Authored Tree-sitter query bindings across TypeScript, Python, and C++, constructing the Neo4j symbol dependency graph.",
        github: "https://github.com/sarahchen-ai",
        linkedin: "https://linkedin.com/in/sarahchen-ml",
        skills: ["Tree-sitter", "Neo4j", "Graph Theory", "Cypher"]
      },
      {
        name: "Amara Okafor",
        role: "Benchmarking & Evaluation Lead",
        photo: "/assets/images/team/amara_okafor.jpg",
        contribution: "Built continuous benchmarking harness testing HumanEval+, SWE-bench Lite, and execution-based validation.",
        github: "https://github.com/amara-okafor-robotics",
        linkedin: "https://linkedin.com/in/amara-okafor",
        skills: ["SWE-bench", "Docker", "CI/CD", "Python"]
      }
    ]
  },
  {
    id: "terrawatch-earth",
    title: "TerraWatch: Multi-Spectral Satellite Deforestation & Wildfire AI",
    category: "Computer Vision",
    status: "Operational Deployment",
    version: "v2.0.4",
    featured: true,
    thumbnail: "/assets/images/projects/satellite_ai.jpg",
    bannerImage: "/assets/images/projects/satellite_ai.jpg",
    tagline: "High-resolution orbital computer vision detecting illegal logging, crop stress, and early wildfire ignition.",
    executiveSummary: "TerraWatch transforms public satellite constellations into an automated orbital planetary watchdog. Ingesting 13-band multi-spectral imagery from European Space Agency Sentinel-2 and NASA Landsat-9, TerraWatch detects canopy loss, illegal logging roads, and early fire hotspots within 90 minutes of orbit passage.",
    corePart: "Multi-temporal Vision Transformer with self-supervised masked autoencoder pretraining, sensitive to infrared Normalized Difference Vegetation Index (NDVI) shifts.",
    uses: [
      "Real-time alerting for illegal Amazonian deforestation and logging camp incursions",
      "Pre-wildfire vegetation dryness index calculation for municipal fire preparedness",
      "Global carbon credit verification and reforestation tree canopy density tracking",
      "Agricultural drought monitoring and soil moisture deficit forecasting"
    ],
    applications: [
      "Environmental protection agencies and indigenous land monitoring councils",
      "Climate ESG investment analytics and carbon credit certifying registries",
      "United Nations Environmental Programme (UNEP) early warning systems",
      "Agricultural commodity supply chain provenance tracking"
    ],
    platform: "Google Earth Engine API • AWS S3 Open Data • Mapbox GL Vector Tiles • Fastify",
    languages: ["Python 3.11", "JavaScript", "Cython", "SQL"],
    frameworks: ["PyTorch 2.3", "GDAL", "Rasterio", "GeoPandas", "Mapbox GL JS", "Chart.js"],
    metrics: {
      accuracy: "95.1% Precision",
      latency: "90 min Orbit-to-Alert",
      fps: "10m Resolution",
      payload: "45,000 km²/day",
      range: "13 Spectral Bands",
      params: "52.1M Weights"
    },
    githubUrl: "https://github.com/nexus-ai-club/terrawatch-earth",
    liveDemoUrl: "https://terrawatch.demo.aiclub.edu",
    paperUrl: "https://arxiv.org/abs/sample-terrawatch-earth-2024",
    docsUrl: "https://docs.terrawatch.aiclub.edu",
    architectureSteps: [
      { step: "01. Multi-Spectral Band Ingestion", detail: "Radiometric calibration of 13 spectral bands including SWIR (Shortwave Infrared) and RedEdge." },
      { step: "02. Cloud & Shadow Masking", detail: "Deep neural cloud-cover filter rejecting atmospheric haze and cirrus artifacts." },
      { step: "03. Temporal Difference Transformer", detail: "Comparing current flyover against 30-day baseline to detect tree felling and soil degradation." },
      { step: "04. Geofenced Telegram & SMS Alerts", detail: "Broadcasting geo-coordinate polygons to field ranger units and open API endpoints." }
    ],
    codeSnippet: `# Multi-Spectral NDVI & Deforestation Alert
import rasterio
import numpy as np
from terrawatch.spectral import MultiTemporalTransformer

def analyze_sentinel2_tile(tile_geotiff_path, previous_baseline_path):
    with rasterio.open(tile_geotiff_path) as src:
        nir = src.read(8).astype(float)
        red = src.read(4).astype(float)
        
    ndvi = (nir - red) / (nir + red + 1e-7)
    
    detector = MultiTemporalTransformer.load("weights/sentinel_transformer.pt")
    loss_mask, confidence = detector.evaluate_canopy_loss(ndvi, previous_baseline_path)
    
    deforested_hectares = np.sum(loss_mask) * (100 / 10000)
    return {
        "status": "ALERT_TRIGGERED" if deforested_hectares > 2.0 else "NORMAL",
        "deforested_hectares": float(deforested_hectares),
        "confidence_score": float(confidence.mean())
    }`,
    simulator: {
      type: "satellite_scanner",
      promptLabel: "Select Satellite Orbital Region to Scan:",
      samples: [
        { label: "Amazon Basin Sector 14-B", result: "HIGH ALERT: 4.8 hectares canopy loss detected along river tributary. Unlicensed road incursion flagged." },
        { label: "California Chaparral Fire Zone", result: "DRYNESS WARNING: SWIR moisture index fell below critical threshold (0.18). Fire risk index: EXTREME." },
        { label: "Congo Basin Conservation Park", result: "ALL STABLE: Canopy density unchanged over 90-day window. NDVI mean: 0.84 (Healthy Rainforest)." }
      ]
    },
    teamPhoto: "/assets/images/team/team_group.jpg",
    teamMembers: [
      {
        name: "Maya Patel",
        role: "GIS & Cloud Data Lead",
        photo: "/assets/images/team/maya_patel.jpg",
        contribution: "Constructed the automated Google Earth Engine ingestion pipeline, vector tiling server, and Mapbox geospatial explorer.",
        github: "https://github.com/mayapatel-dev",
        linkedin: "https://linkedin.com/in/maya-patel-cloud",
        skills: ["GIS / GDAL", "Earth Engine", "Fastify", "Mapbox GL"]
      },
      {
        name: "Sarah Chen",
        role: "Remote Sensing AI Lead",
        photo: "/assets/images/team/sarah_chen.jpg",
        contribution: "Designed the multi-spectral self-supervised transformer and trained change-detection heads on Sentinel-2 historical imagery.",
        github: "https://github.com/sarahchen-ai",
        linkedin: "https://linkedin.com/in/sarahchen-ml",
        skills: ["Transformers", "Remote Sensing", "PyTorch", "Python"]
      },
      {
        name: "Amara Okafor",
        role: "Pipeline Optimization & Alert System",
        photo: "/assets/images/team/amara_okafor.jpg",
        contribution: "Created serverless AWS Lambda triggers sending encrypted SMS and Telegram geo-coordinate alerts to frontline conservation rangers.",
        github: "https://github.com/amara-okafor-robotics",
        linkedin: "https://linkedin.com/in/amara-okafor",
        skills: ["AWS Lambda", "Webhook APIs", "GeoPandas", "DevOps"]
      },
      {
        name: "Liam Vance",
        role: "Dataset & Validation Researcher",
        photo: "/assets/images/team/liam_vance.jpg",
        contribution: "Benchmarked model accuracy against Hansen Global Forest Change ground-truth data, achieving 95.1% precision.",
        github: "https://github.com/liamvance-tech",
        linkedin: "https://linkedin.com/in/liam-vance-ai",
        skills: ["Benchmarking", "Statistics", "Python", "Data Science"]
      }
    ]
  }
];

export const getProjectById = (id: string): ProjectItem => {
  return PROJECTS_DATA.find(p => p.id === id) || PROJECTS_DATA[0];
};
