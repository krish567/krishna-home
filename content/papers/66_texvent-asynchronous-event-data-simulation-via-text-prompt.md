# Texvent: Asynchronous Event Data Simulation via Text Prompt

**Authors:** Ruofei Wang ⋅ Peiqi Duan ⋅ Ka Chun Cheung ⋅ Simon See ⋅ Boxin Shi ⋅ Renjie Wan

**Date/Time:** Jun 7, 3:30 PM - 5:30 PM

**Location:** ExHall A

**Type:** POSTER

## Abstract

Current event simulation methods focus on employing videos to synthesize new event data, suffering from costly video capture and limited scalability across viewpoints, motions, and lighting. To this end, we propose a Text-to-event simulation framework (Texvent) that can directly generate asynchronous event data from simple text prompts. Texvent first renders prompt-driven videos via multimodal large language models and subsequently applies a new physical simulator to generate event streams. Specifically, an adaptive brightness-aware frame interpolation approach is proposed to enhance the temporal resolution of the rendered videos. A balanced logarithmic intensity comparison strategy and a cache–based voltage refreshment mechanism are introduced into the simulator to generate event data.To narrow the sim-to-real gap, we also introduce background activity noise injection and dense time stamp reconstruction operations. Extensive experiments demonstrate Texvent’s superior computational efficiency and its ability to generate more realistic event data than existing simulators. View full details
