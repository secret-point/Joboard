import { AdditionalBGCFormConfigPart1, ConvictionDetailConfig, PreviousLegalNameFormConfig, PreviousWorkedAtAmazonBGCFormConfig } from "../../../../src/utils/constants/common";

describe('common', () => {

  describe('regex', () => {
    describe('AdditionalBGCFormConfigPart1', () => {

      describe('Address Line 1', () => {
        const regex = new RegExp(AdditionalBGCFormConfigPart1[0].regex as string);

        it('should return expected match result', () => {
          // empty string
          expect(regex.test('')).toBe(false);

          // min length
          expect(regex.test('a')).toBe(false);
          expect(regex.test('Bc')).toBe(true);

          // spaces
          expect(regex.test('1234 Main St')).toBe(true);
          expect(regex.test('1234 Main St ')).toBe(false);
          expect(regex.test(' 1234 Main St')).toBe(false);
          expect(regex.test('1234  Main St')).toBe(true);

          // special characters
          expect(regex.test('1234 Main St!')).toBe(false);
          expect(regex.test('1234-Main-St')).toBe(true);
          expect(regex.test('1234-Main! St')).toBe(true);
          expect(regex.test('1234 Main St-')).toBe(false);
          expect(regex.test('1234 Main St.')).toBe(false);
          expect(regex.test('1234 Main St!')).toBe(false);
          expect(regex.test('1234 Àö Main St')).toBe(true);
          expect(regex.test('Àö 1234 Main St')).toBe(true);
          expect(regex.test('1234 Main St Àö')).toBe(true);
        });
      });

      describe('Address Line 2 (Apartment, suite, .etc)', () => {
        const regex = new RegExp(AdditionalBGCFormConfigPart1[1].regex as string);

        it('should return expected match result', () => {
          // empty string
          expect(regex.test('')).toBe(false);

          // min length
          expect(regex.test('a')).toBe(false);
          expect(regex.test('01')).toBe(true);

          // spaces
          expect(regex.test('APT 301')).toBe(true);
          expect(regex.test('APT 301 ')).toBe(false);
          expect(regex.test(' APT 301')).toBe(false);
          expect(regex.test('APT  301')).toBe(true);

          // special characters
          expect(regex.test('APT 301!')).toBe(false);
          expect(regex.test('APT-301')).toBe(true);
          expect(regex.test('APT! 301')).toBe(true);
          expect(regex.test('APT 301-')).toBe(false);
          expect(regex.test('APT 301.')).toBe(false);
          expect(regex.test('APT 301!')).toBe(false);
          expect(regex.test('APT Àö 301')).toBe(true);
          expect(regex.test('Àö APT 301')).toBe(true);
          expect(regex.test('APT 301 Àö')).toBe(true);
        });
      });

      describe('City', () => {
        const regex = new RegExp(AdditionalBGCFormConfigPart1[2].regex as string);

        it('should return expected match result', () => {
          // empty string
          expect(regex.test('')).toBe(false);

          // min length
          expect(regex.test('N')).toBe(false);
          expect(regex.test('NY')).toBe(true);

          // spaces
          expect(regex.test('New York')).toBe(true);
          expect(regex.test('New York ')).toBe(false);
          expect(regex.test(' New York')).toBe(false);
          expect(regex.test('New  York')).toBe(true);

          // special characters
          expect(regex.test('New York!')).toBe(false);
          expect(regex.test('New-York')).toBe(true);
          expect(regex.test('New! York')).toBe(true);
          expect(regex.test('New York-')).toBe(false);
          expect(regex.test('New York.')).toBe(false);
          expect(regex.test('New York!')).toBe(false);
          expect(regex.test('New Àö York')).toBe(true);
          expect(regex.test('Àö New York')).toBe(true);
          expect(regex.test('New York Àö')).toBe(true);
        });
      });

      describe('State/province', () => {
        const regex = new RegExp(AdditionalBGCFormConfigPart1[3].regex as string);

        it('should return expected match result', () => {
          // empty string
          expect(regex.test('')).toBe(false);

          // min length
          expect(regex.test('C')).toBe(false);
          expect(regex.test('CA')).toBe(true);

          // spaces
          expect(regex.test('CA')).toBe(true);
          expect(regex.test('CA ')).toBe(false);
          expect(regex.test(' CA')).toBe(false);
          expect(regex.test('C A')).toBe(true);

          // special characters
          expect(regex.test('CA!')).toBe(false);
          expect(regex.test('CA-')).toBe(false);
          expect(regex.test('CA!')).toBe(false);
          expect(regex.test('CA.')).toBe(false);
          expect(regex.test('CA!')).toBe(false);
          expect(regex.test('CÀ')).toBe(false);
          expect(regex.test('Àö')).toBe(false);
          expect(regex.test('California')).toBe(true);
          expect(regex.test('CA1')).toBe(true);
        });
      });

      describe('Zip/Postal Code', () => {
        const regex = new RegExp(AdditionalBGCFormConfigPart1[4].regex as string);

        it('should return expected match result', () => {
          // empty string
          expect(regex.test('')).toBe(false);

          // min length
          expect(regex.test('1')).toBe(false);
          expect(regex.test('12')).toBe(false);
          expect(regex.test('123')).toBe(false);
          expect(regex.test('1234')).toBe(false);

          // spaces
          expect(regex.test('12345')).toBe(true);
          expect(regex.test('12345 ')).toBe(false);
          expect(regex.test(' 12345')).toBe(false);
          expect(regex.test('1234 5')).toBe(false);

          // special characters
          expect(regex.test('12345!')).toBe(false);
          expect(regex.test('1234-5')).toBe(false);
          expect(regex.test('1234! 5')).toBe(false);
          expect(regex.test('12345-')).toBe(false);
          expect(regex.test('12345.')).toBe(false);
          expect(regex.test('12345!')).toBe(false);
          expect(regex.test('1234À5')).toBe(false);
          expect(regex.test('Àö 12345')).toBe(false);
          expect(regex.test('12345 Àö')).toBe(false);

          // correct/incorrect format
          expect(regex.test('12345-1234')).toBe(true);
          expect(regex.test('12345-123')).toBe(false);
          expect(regex.test('01234')).toBe(true);
          expect(regex.test('01234-0000')).toBe(true);
        });
      });
    });

    describe('PreviousLegalNameFormConfig', () => {
      describe('previousLegalNames', () => {
        const regex = new RegExp(PreviousLegalNameFormConfig.regex as string);

        it('should return expected match result', () => {
          // empty string
          expect(regex.test('')).toBe(false);

          // min length
          expect(regex.test('J')).toBe(false);
          expect(regex.test('Jo')).toBe(false);

          // spaces
          expect(regex.test('John')).toBe(false);
          expect(regex.test('John ')).toBe(false);
          expect(regex.test(' John')).toBe(false);
          expect(regex.test('John Do')).toBe(true);
          expect(regex.test('John  Do')).toBe(false);
          expect(regex.test('John   Do')).toBe(false);

          // special characters
          expect(regex.test('John!')).toBe(false);
          expect(regex.test('John-Do')).toBe(false);
          expect(regex.test('John-Do Smith')).toBe(true);
          expect(regex.test('John! Do')).toBe(true);
          expect(regex.test('John-')).toBe(false);
          expect(regex.test('John.')).toBe(false);
          expect(regex.test('John!')).toBe(false);
          expect(regex.test('John Dö')).toBe(true);
          expect(regex.test('Àö Do')).toBe(true);
          expect(regex.test('John Àö')).toBe(true);
          expect(regex.test('John  Àö')).toBe(false);

          // correct/incorrect format
          expect(regex.test('John Do')).toBe(true);
        });
      });
    });

    describe('ConvictionDetailConfig', () => {
      describe('convictionDetails', () => {
        const regex = new RegExp(ConvictionDetailConfig.regex as string);

        it('should return expected match result', () => {
          // empty string
          expect(regex.test('')).toBe(false);

          // min length
          expect(regex.test('C')).toBe(false);
          expect(regex.test('Co')).toBe(true);

          // spaces
          expect(regex.test('Conviction')).toBe(true);
          expect(regex.test('Conviction ')).toBe(true);
          expect(regex.test(' Conviction')).toBe(false);
          expect(regex.test('Conviction Details')).toBe(true);
          expect(regex.test('Conviction  Details')).toBe(true);

          // special characters
          expect(regex.test('Conviction!')).toBe(true);
          expect(regex.test('Conviction-Details')).toBe(true);
          expect(regex.test('Conviction! Details')).toBe(true);
          expect(regex.test('Conviction, Details')).toBe(true);
          expect(regex.test('Conviction-')).toBe(true);
          expect(regex.test('Conviction Details.')).toBe(true); // allow '.' in the end
          expect(regex.test('Conviction!')).toBe(true);
          expect(regex.test('Conviction Dö')).toBe(true);
          expect(regex.test('Àö Details')).toBe(true);
          expect(regex.test('Conviction Àö')).toBe(true);
          expect(regex.test('Conviction Àö,.)!#')).toBe(true);
          expect(regex.test('Conviction Àö,.()#!')).toBe(true);

          // correct/incorrect format
          expect(regex.test('Conviction Details')).toBe(true);
        });
      });
    });

    describe('PreviousWorkedAtAmazonBGCFormConfig', () => {
      describe('mostRecentBuildingWorkedAtAmazon', () => {
        const regex = new RegExp(PreviousWorkedAtAmazonBGCFormConfig[0].regex as string);

        it('should return expected match result', () => {
          // empty string
          expect(regex.test('')).toBe(false);

          // min length
          expect(regex.test('Y')).toBe(false);
          expect(regex.test('YV')).toBe(true);

          // spaces
          expect(regex.test('Yvr')).toBe(true);
          expect(regex.test('Yvr ')).toBe(false);
          expect(regex.test(' Yvr')).toBe(false);
          expect(regex.test('Yvr 11')).toBe(true);
          expect(regex.test('Yvr  11')).toBe(true);

          // special characters
          expect(regex.test('Yvr!')).toBe(false);
          expect(regex.test('Yvr-11')).toBe(true);
          expect(regex.test('Yvr! 11')).toBe(false);
          expect(regex.test('Yvr-')).toBe(false);
          expect(regex.test('Yvr.')).toBe(false);
          expect(regex.test('Yvr!')).toBe(false);
          expect(regex.test('Yvr Dö')).toBe(true);
          expect(regex.test('UNIÖN Building')).toBe(true);
          expect(regex.test('UNIÖN-Building')).toBe(true);
          expect(regex.test('UNIÖN Building-')).toBe(false);
          expect(regex.test('Àö Do')).toBe(true);
          expect(regex.test('Yvr Àö')).toBe(true);

          // correct/incorrect format
          expect(regex.test('Yvr 11')).toBe(true);
          expect(regex.test('Yvr11')).toBe(true);
        });
      });

      describe('mostRecentTimePeriodWorkedAtAmazon', () => {
        const regex = new RegExp(PreviousWorkedAtAmazonBGCFormConfig[1].regex as string);

        it('should return expected match result', () => {
          // empty string
          expect(regex.test('')).toBe(false);

          // min length
          expect(regex.test('9')).toBe(false);
          expect(regex.test('09')).toBe(false);

          // special characters
          expect(regex.test('09/21 - 08/22!')).toBe(false);
          expect(regex.test('09/21! - 08/22')).toBe(false);
          expect(regex.test('09/21 - 08/22-')).toBe(false);
          expect(regex.test('09/21 - 08/22.')).toBe(false);
          expect(regex.test('09/21 - 08/22!')).toBe(false);
          expect(regex.test('09/21 - 08/Dö')).toBe(false);
          expect(regex.test('Àö/21 - 08/22')).toBe(false);

          // correct/incorrect format
          expect(regex.test('09/21 - 08/22')).toBe(true);
          expect(regex.test('09/21 ')).toBe(false);
          expect(regex.test(' 09/21')).toBe(false);
          expect(regex.test('09/21  - 08/22')).toBe(false);
          expect(regex.test('09/21 -  08/22')).toBe(false);
          expect(regex.test('09/21  -  08/22')).toBe(false);
        });
      });
    });
  });
});
