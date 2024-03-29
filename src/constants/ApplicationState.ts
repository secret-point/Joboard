export enum ApplicationState {
  /**
   * Application created
   */
  APPLICATION_CREATED = "APPLICATION_CREATED",
  /**
   * Candidate passed the assessment
   */
  ASSESSMENT_PASSED = "ASSESSMENT_PASSED",
  /**
   * Candidate selected location and shift
   */
  JOB_SELECTED = "JOB_SELECTED",
  /**
   * Candidate reviewed and accepted contingent offer
   */
  CONTINGENT_OFFER_ACCEPTED = "CONTINGENT_OFFER_ACCEPTED",
  /**
   * Candidate completed FCRA step
   */
  FCRA_CONSENT_SAVED = "FCRA_CONSENT_SAVED",
  /**
   * Candidate completed Non-FCRA step
   */
  NON_FCRA_CONSENT_SAVED = "NON_FCRA_CONSENT_SAVED",
  /**
   * Candidate completed additional background check step
   */
  ADDITIONAL_BACKGROUND_INFO_SAVED = "ADDITIONAL_BACKGROUND_INFO_SAVED",
  /**
   * Candidate completed additional background check step
   */
  CALIFORNIA_DISCLOSURE_SAVED = "CALIFORNIA_DISCLOSURE_SAVED",
  /**
   * Candidate scheduled pre-hire appointment
   */
  PRE_HIRE_APPOINTMENT_SCHEDULED = "PRE_HIRE_APPOINTMENT_SCHEDULED",
  /**
   * Application reviewed and submitted by candidate
   */
  APPLICATION_SUBMITTED = "APPLICATION_SUBMITTED",
  /**
   * Candidate completed WOTC form
   */
  WOTC_COMPLETED = "WOTC_COMPLETED",
  /**
   * Candidate completed WOTC form
   */
  WOTC_INITIATED = "WOTC_INITIATED",
  /**
   * SelfID steps
   */
  EQUAL_OPPORTUNITY_FORM_SAVED = "EQUAL_OPPORTUNITY_FORM_SAVED",
  VETERAN_STATUS_SAVED = "VETERAN_STATUS_SAVED",
  SELF_IDENTIFICATION_COMPLETED = "SELF_IDENTIFICATION_COMPLETED"
}
