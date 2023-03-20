import {
  CaaSBgcPageStatusUpdate,
  CandidateBgcAdditionalDocumentation,
  CandidateBgcAddressHistory,
  CandidateBgcAttachmentExpirationDate,
  CandidateBgcAttachmentMetadata,
  CandidateBgcBackgroundInfo,
  CandidateBgcBirthInformation,
  CandidateBgcDisclosure,
  CandidateBgcInitiateUploadAttachment
} from "./../utils/types/common";
import { axiosHelper } from "../helpers/axios-helper";
import { AxiosInstance } from "axios";

const CANDIDATE_BASE_URL = "/api/candidate-application";
const CANDIDATE_URL_ENDPOINT = CANDIDATE_BASE_URL + "/candidate";

export default class FullBgcService {
  private readonly axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axiosHelper();
  }

  async updateCandidateBgcDisclosure({
    bgcDisclosure
  }: CandidateBgcDisclosure) {
    const response = await this.axiosInstance.put(CANDIDATE_URL_ENDPOINT, {
      bgcDisclosure
    });
    return response.data;
  }

  async withdrawApplication(applicationId: string) {
    const response = await this.axiosInstance.post(
      `/application/${applicationId}/withdraw`
    );
    return response.data;
  }

  async updateCandidateBackgroundInformation({
    firstName,
    lastName,
    middleName,
    phoneNumber,
    additionalBackgroundInfo
  }: CandidateBgcBackgroundInfo) {
    const response = await this.axiosInstance.put(CANDIDATE_URL_ENDPOINT, {
      firstName,
      lastName,
      middleName,
      phoneNumber,
      additionalBackgroundInfo
    });
    return response.data;
  }

  async updateCandidateAddressHistory(payload: CandidateBgcAddressHistory) {
    const response = await this.axiosInstance.put(
      CANDIDATE_URL_ENDPOINT,
      payload
    );
    return response.data;
  }

  async updateCandidateBirthHistory({
    additionalBackgroundInfo,
    selfIdentificationInfo
  }: CandidateBgcBirthInformation) {
    const response = await this.axiosInstance.put(CANDIDATE_URL_ENDPOINT, {
      additionalBackgroundInfo,
      selfIdentificationInfo
    });
    return response.data;
  }

  async uploadCandidateAttachmentToCDS({
    attachmentType,
    attachmentSubType,
    fileName,
    contentType,
    returnPresignedUrl
  }: CandidateBgcInitiateUploadAttachment) {
    const response = await this.axiosInstance.put(
      CANDIDATE_URL_ENDPOINT + "/attachment/initiateUpload",
      {
        attachmentType,
        attachmentSubType,
        fileName,
        contentType,
        returnPresignedUrl
      }
    );
    return response.data;
  }

  async updateAttachmentMetaData({
    attachmentSubType,
    attachmentType,
    uploadStatus
  }: CandidateBgcAttachmentMetadata) {
    const response = await this.axiosInstance.patch(
      CANDIDATE_URL_ENDPOINT + "/attachment/attachmentMetadata",
      { attachmentSubType, attachmentType, uploadStatus }
    );
    return response.data;
  }

  async updateAttachmentExpireDate({
    attachmentSubType,
    attachmentType,
    attachmentExpirationDateTime
  }: CandidateBgcAttachmentExpirationDate) {
    const response = await this.axiosInstance.patch(
      CANDIDATE_URL_ENDPOINT + "/attachment/attachmentMetadata",
      { attachmentSubType, attachmentType, attachmentExpirationDateTime }
    );
    return response.data;
  }

  async updateCandidateDocumentation({ additionalNationalIds }: CandidateBgcAdditionalDocumentation) {
    const response = await this.axiosInstance.put(CANDIDATE_URL_ENDPOINT, { additionalNationalIds });
    return response.data;
  }

  // pending implementation
  async getListOfCandidateAttachmentMetadata() {
    const response = await this.axiosInstance.get(CANDIDATE_URL_ENDPOINT + "/attachmentMetadataList");
    return response.data;
  };

  // pending implementation
  async updateCaaSStatus({ candidateId, eventType }: CaaSBgcPageStatusUpdate) {
    // pending url endpoint
    const response = await this.axiosInstance.put("", { candidateId, eventType });
    return response.data;
  };

  // pending implementation
  async uploadCandidateAttachmentToS3() {}
}
