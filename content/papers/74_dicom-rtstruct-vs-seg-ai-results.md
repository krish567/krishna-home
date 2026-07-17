# DICOM RTSTRUCT vs DICOM SEG for AI Results

**Authors:** Herman Oosterwijk

**Date/Time:** Jul 15, 2026

**Location:** LinkedIn

**Type:** ARTICLE

## Abstract

Even though the DICOM SEG (Segmentation) file format is the recommended output for AI graphics imaging results, support from many PACS and workstation vendors has been lacking. Note that even if a vendor supports it today in its most recent software release, in practice, an institution might be behind one or more releases, as an upgrade is often a major effort, could break or eliminate functionality, or even have a cost involved; therefore, AI vendors might be looking for alternatives, which is where the DICOM RTSTRUCT file format could be used. The DICOM SEG format stores masks that outline specific regions of interest, with masks for every slice stored in a single, multi-frame file. Segments can be binary (e.g., inside or outside a tumor) or fractional, representing probabilities or occupancy percentages (such as confidence levels from an AI algorithm). When a Frame of Reference exists, the segmentation positions and orientations are tied directly to the patient's specific coordinate system, allowing alignment across different scans. The DICOM RTSTRUCT (Radiation Therapy Structure Set) object differs significantly from the DICOM SEG file format and is older than SEG; it was added to the DICOM standard in 1997, whereas the SEG object was added about 10 years later. RTSTRUCT stores Regions of Interest (ROIs) as contour coordinates mapped to a patient's imaging, and is generally supported by PACS systems for storage today. The key differences: RTSTRUCT includes vectors (points and polygons) as coordinates, whereas SEG contains pixel- or voxel-based masks; RTSTRUCT files are primarily 2D, while SEG files are aligned with voxels providing volumetric segmentation; overlapping regions are cumbersome in RTSTRUCT but naturally supported in SEG. RTSTRUCT serves as a temporary fix for SEG file formats to exchange AI-generated graphics, with the only reason to use it being that it is widely supported by existing PACS and view station software. However, because of the differences between the two representations, implementers will basically have to start from scratch if they want to implement SEG after implementing RTSTRUCT.

View full details: https://www.linkedin.com/pulse/dicom-rtstruct-vs-seg-ai-results-herman-oosterwijk-kkakc