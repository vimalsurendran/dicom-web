# DICOMweb

DICOMweb™ is the DICOM Standard for web-based medical imaging. It is a set of RESTful services, enabling web developers to unlock the power of healthcare images using industry-standard toolsets. DICOMweb can be implemented directly or as a proxy to the DIMSE services to offer modern web-based access to DICOM-enabled systems. Image-producing modalities don’t all need to be retrofitted to support DICOMweb.

## Prequisites
   - A PACS Server (Eg: Orthanc) need to be installed. So that the DICOM images can be stored their.
   - Node
   - NPM

## Installation
- Checkout the code.
- Install dependencies using the following command

```bash
npm install
```
- node index.js


## Usage
### Currently Implemented
  - Store DICOM objects (STOW-RS)


### To Be Implemented
  - Search for DICOM objects (QIDO-RS)
  - Retrieve DICOM objects (WADO-RS)
  - Retrieve single DICOM instances (WADO-URI)
  - Manage worklist items (UPS-RS)


