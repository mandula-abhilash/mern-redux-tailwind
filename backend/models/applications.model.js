import mongoose from "mongoose";

const Schema = mongoose.Schema;

const applicationSchema = new Schema(
  {
    url: { type: String },
    authorityName: { type: String },
    reference: { type: String },
    alternateReference: { type: String },
    caseTechnicalKey: { type: String },
    receivedDate: { type: String },
    validatedDate: { type: String },
    address: { type: String },
    addressLink: { type: String },
    proposal: { type: String },
    status: { type: String },
    appealStatus: { type: String },
    appealDecision: { type: String },
    scrapedDates: [String],
    dateTypes: [String],
    expiryDate: { type: String },
    actualCommitteeDate: { type: String },
    latestNeighbourConsultationDate: { type: String },
    neighbourConsultationExpiryDate: { type: String },
    standardConsultationDate: { type: String },
    standardConsultationExpiryDate: { type: String },
    lastAdvertisedInPressDate: { type: String },
    latestAdvertisementExpiryDate: { type: String },
    lastSiteNoticePostedDate: { type: String },
    latestSiteNoticeExpiryDate: { type: String },
    statutoryExpiryDate: { type: String },
    internalTargetDate: { type: String },
    agreedExpiryDate: { type: String },
    decisionMadeDate: { type: String },
    permissionExpiryDate: { type: String },
    decisionPrintedDate: { type: String },
    environmentalImpactAssessmentReceived: { type: String },
    determinationDeadline: { type: String },
    temporaryPermissionExpiryDate: { type: String },
    //further info
    applicationType: { type: String },
    expDecisionLevel: { type: String },
    caseOfficer: { type: String },
    parish: { type: String },
    ward: { type: String },
    districtReference: { type: String },
    applicantName: { type: String },
    applicantAddress: { type: String },
    agentName: { type: String },
    agentCompanyName: { type: String },
    agentAddress: { type: String },
    environmentalAssessmentRequested: { type: String },
    agents: [
      {
        name: { type: String },
        email1: { type: String },
        email2: { type: String },
        phone1: { type: String },
        phone2: { type: String },
        address: { type: String },
      },
    ],
    councillors: [
      {
        name: { type: String },
        email1: { type: String },
        email2: { type: String },
        phone1: { type: String },
        phone2: { type: String },
        address: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Application = mongoose.model("Application", applicationSchema);

export default Application;
