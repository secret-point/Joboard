
// UK Additional info fields here onwards 
const UK_NATIONAL_INSURANCE_PASS_VALUE = "NO NI";

export const validateUKNationalInsuranceNumber = (value: any): boolean => {
  if (!value) return false;
  if (value.toUpperCase() === UK_NATIONAL_INSURANCE_PASS_VALUE) return true;

  /*
   The regexes follow this guidance on the National Insurance Number formatting: https://www.gov.uk/hmrc-internal-manuals/national-insurance-manual/nim39110 with a small adjustment to
   allow for an 8 character NIN type used from SF in addition to the 9 character type. (hence ? to the last group of nationalInsuranceNumberMask).
  */
  const maskedInsuranceNumberRegex = /(^[*]{5}\d{3}[A-Z]$)|(^[*]{4}\d{4}$)/i;
  const nationalInsuranceNumberRegex = /^(?:(?!TN)[A-Z]{2})([0-9]{6})([A-Z]{1})?$/i;
  const temporaryNationalInsuranceNumberRegex = /^TN\d{6}$/;

  const sanitizedValue = value.replace(/\s/g, "").toUpperCase();

  return (
    maskedInsuranceNumberRegex.test(value) ||
    temporaryNationalInsuranceNumberRegex.test(sanitizedValue) ||
    nationalInsuranceNumberRegex.test(sanitizedValue)
  );
};

export const validateUKPostcode = (value: any): boolean => {
  if (!value) return false;

  const ukPostcodeMask = /^(([A-Z][A-HJ-Y]?\d[A-Z\d]?|ASCN|STHL|TDCU|BBND|[BFS]IQQ|PCRN|TKCA) ?\d[A-Z]{2}|BFPO ?\d{1,4}|(KY\d|MSR|VG|AI)[ -]?\d{4}|[A-Z]{2} ?\d{2}|GE ?CX|GIR ?0A{2}|SAN ?TA1)$/;

  const sanitizedValue = value.replace(/\s/g, "").toUpperCase();

  return ukPostcodeMask.test(sanitizedValue);
};