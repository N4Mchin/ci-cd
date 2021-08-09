// https://www.hl7.org/fhir/codesystem-name-use.json.html
const NameUse = [
  {
    code: 'usual',
    display: 'Usual',
    definition: 'Known as/conventional/the one you normally use.',
  },
  {
    code: 'official',
    display: 'Official',
    definition:
      "The formal name as registered in an official (government) registry, but which name might not be commonly used. May be called 'legal name'.",
  },
  {
    code: 'temp',
    display: 'Temp',
    definition:
      'A temporary name. Name.period can provide more detailed information. This may also be used for temporary names assigned at birth or in emergency situations.',
  },
  {
    code: 'nickname',
    display: 'Nickname',
    definition:
      'A name that is used to address the person in an informal manner, but is not part of their formal or usual name.',
  },
  {
    code: 'anonymous',
    display: 'Anonymous',
    definition:
      "Anonymous assigned name, alias, or pseudonym (used to protect a person's identity for privacy reasons).",
  },
  {
    code: 'old',
    display: 'Old',
    definition:
      'This name is no longer in use (or was never correct, but retained for records).',
    concept: [
      {
        code: 'maiden',
        display: 'Name changed for Marriage',
        definition:
          "A name used prior to changing name because of marriage. This name use is for use by applications that collect and store names that were used prior to a marriage. Marriage naming customs vary greatly around the world, and are constantly changing. This term is not gender specific. The use of this term does not imply any particular history for a person's name.",
      },
    ],
  },
]

// https://www.hl7.org/fhir/codesystem-identifier-use.html
const ValuesetIdentifierUse = [
  {
    code: 'usual',
    display: 'Usual',
    definition:
      'The identifier recommended for display and use in real-world interactions.',
  },
  {
    code: 'official',
    display: 'Official',
    definition:
      "The identifier considered to be most trusted for the identification of this item. Sometimes also known as 'primary' and 'main'. The determination of 'official' is subjective and implementation guides often provide additional guidelines for use.",
  },
  {
    code: 'temp',
    display: 'Temp',
    definition: 'A temporary identifier.',
  },
  {
    code: 'secondary',
    display: 'Secondary',
    definition:
      'An identifier that was assigned in secondary use - it serves to identify the object in a relative context, but cannot be consistently assigned to the same object again in a different context.',
  },
  {
    code: 'old',
    display: 'Old',
    definition:
      'The identifier id no longer considered valid, but may be relevant for search purposes.  E.g. Changes to identifier schemes, account merges, etc.',
  },
]

// https://www.hl7.org/fhir/v2/0203/v2-0203.cs.json.html
const ValuesetIdentifierType = [
  {
    code: 'DL',
    display: "Driver's License Number",
  },
  {
    code: 'PPN',
    display: 'Passport number',
  },
  {
    code: 'BRN',
    display: 'Breed Registry Number',
  },
  {
    code: 'MR',
    display: 'Medical Record Number',
  },
  {
    code: 'MCN',
    display: 'Microchip Number',
  },
  {
    code: 'EN',
    display: 'Employee Number',
  },
  {
    code: 'TAX',
    display: 'Tax ID number',
  },
  {
    code: 'NIIP',
    display: 'National Insurance Payor Identifier (Payor)',
  },
  {
    code: 'PRN',
    display: 'Provider number',
  },
  {
    code: 'MD',
    display: 'Medical License number',
  },
  {
    code: 'DR',
    display: 'Donor Registration Number',
  },
  {
    code: 'ACSN',
    display: 'Accession ID',
  },
  {
    code: 'UDI',
    display: 'Universal Device Identifier',
  },
  {
    code: 'SNO',
    display: 'Serial Number',
  },
  {
    code: 'SB',
    display: 'Social Beneficiary Identifier',
  },
  {
    code: 'PLAC',
    display: 'Placer Identifier',
  },
  {
    code: 'FILL',
    display: 'Filler Identifier',
  },
  {
    code: 'JHN',
    display: 'Jurisdictional health number (Canada)',
  },
]

// https://www.hl7.org/fhir/codesystem-administrative-gender.html
const AdministrativeGender = [
  {
    code: 'male',
    display: 'Male',
    definition: 'Male.',
  },
  {
    code: 'female',
    display: 'Female',
    definition: 'Female.',
  },
  {
    code: 'other',
    display: 'Other',
    definition: 'Other.',
  },
  {
    code: 'unknown',
    display: 'Unknown',
    definition: 'Unknown.',
  },
]

// https://www.hl7.org/fhir/codesystem-contact-point-system.html
const ContactPointSystem = [
  {
    code: 'phone',
    display: 'Phone',
    definition:
      'The value is a telephone number used for voice calls.Use of full international numbers starting with + is recommended to enable automatic dialing support but not required.',
  },
  {
    code: 'fax',
    display: 'Fax',
    definition:
      'The value is a fax machine.Use of full international numbers starting with + is recommended to enable automatic dialing support but not required.',
  },
  {
    code: 'email',
    display: 'Email',
    definition: 'The value is an email address.',
  },
  {
    code: 'pager',
    display: 'Pager',
    definition:
      'The value is a pager number.These may be local pager numbers that are only usable on a particular pager system.',
  },
  {
    code: 'url',
    display: 'URL',
    definition:
      'A contact that is not a phone, fax, pager or email address and is expressed as a URL.This is intended for various institutional or personal contacts including web sites, blogs, Skype, Twitter, Facebook, etc.Do not use for email addresses.',
  },
  {
    code: 'sms',
    display: 'SMS',
    definition:
      'A contact that can be used for sending an sms message(e.g.mobile phones, some landlines).',
  },
  {
    code: 'other',
    display: 'Other',
    definition:
      'A contact that is not a phone, fax, page or email address and is not expressible as a URL.E.g.Internal mail address.This SHOULD NOT be used for contacts that are expressible as a URL(e.g.Skype, Twitter, Facebook, etc.) Extensions may be used to distinguish "other" contact types.',
  },
]

const AddressUse = [
  {
    code: 'home',
    display: 'Home',
  },
  {
    code: 'work',
    display: 'Work',
  },
  {
    code: 'temp',
    display: 'Temp',
  },
  {
    code: 'old',
    display: 'Old',
  },
  {
    code: 'billing',
    display: 'Billing',
  },
]

const AddressType = [
  {
    code: 'postal',
    display: 'Postal',
  },
  {
    code: 'physical',
    display: 'Physical',
  },
  {
    code: 'both',
    display: 'Both',
  },
]

const CountryList = [
  { name: 'Afghanistan', 'alpha-2': 'AF', 'country-code': '004' },
  { name: 'Åland Islands', 'alpha-2': 'AX', 'country-code': '248' },
  { name: 'Albania', 'alpha-2': 'AL', 'country-code': '008' },
  { name: 'Algeria', 'alpha-2': 'DZ', 'country-code': '012' },
  { name: 'American Samoa', 'alpha-2': 'AS', 'country-code': '016' },
  { name: 'Andorra', 'alpha-2': 'AD', 'country-code': '020' },
  { name: 'Angola', 'alpha-2': 'AO', 'country-code': '024' },
  { name: 'Anguilla', 'alpha-2': 'AI', 'country-code': '660' },
  { name: 'Antarctica', 'alpha-2': 'AQ', 'country-code': '010' },
  { name: 'Antigua and Barbuda', 'alpha-2': 'AG', 'country-code': '028' },
  { name: 'Argentina', 'alpha-2': 'AR', 'country-code': '032' },
  { name: 'Armenia', 'alpha-2': 'AM', 'country-code': '051' },
  { name: 'Aruba', 'alpha-2': 'AW', 'country-code': '533' },
  { name: 'Australia', 'alpha-2': 'AU', 'country-code': '036' },
  { name: 'Austria', 'alpha-2': 'AT', 'country-code': '040' },
  { name: 'Azerbaijan', 'alpha-2': 'AZ', 'country-code': '031' },
  { name: 'Bahamas', 'alpha-2': 'BS', 'country-code': '044' },
  { name: 'Bahrain', 'alpha-2': 'BH', 'country-code': '048' },
  { name: 'Bangladesh', 'alpha-2': 'BD', 'country-code': '050' },
  { name: 'Barbados', 'alpha-2': 'BB', 'country-code': '052' },
  { name: 'Belarus', 'alpha-2': 'BY', 'country-code': '112' },
  { name: 'Belgium', 'alpha-2': 'BE', 'country-code': '056' },
  { name: 'Belize', 'alpha-2': 'BZ', 'country-code': '084' },
  { name: 'Benin', 'alpha-2': 'BJ', 'country-code': '204' },
  { name: 'Bermuda', 'alpha-2': 'BM', 'country-code': '060' },
  { name: 'Bhutan', 'alpha-2': 'BT', 'country-code': '064' },
  {
    name: 'Bolivia (Plurinational State of)',
    'alpha-2': 'BO',
    'country-code': '068',
  },
  {
    name: 'Bonaire, Sint Eustatius and Saba',
    'alpha-2': 'BQ',
    'country-code': '535',
  },
  { name: 'Bosnia and Herzegovina', 'alpha-2': 'BA', 'country-code': '070' },
  { name: 'Botswana', 'alpha-2': 'BW', 'country-code': '072' },
  { name: 'Bouvet Island', 'alpha-2': 'BV', 'country-code': '074' },
  { name: 'Brazil', 'alpha-2': 'BR', 'country-code': '076' },
  {
    name: 'British Indian Ocean Territory',
    'alpha-2': 'IO',
    'country-code': '086',
  },
  { name: 'Brunei Darussalam', 'alpha-2': 'BN', 'country-code': '096' },
  { name: 'Bulgaria', 'alpha-2': 'BG', 'country-code': '100' },
  { name: 'Burkina Faso', 'alpha-2': 'BF', 'country-code': '854' },
  { name: 'Burundi', 'alpha-2': 'BI', 'country-code': '108' },
  { name: 'Cabo Verde', 'alpha-2': 'CV', 'country-code': '132' },
  { name: 'Cambodia', 'alpha-2': 'KH', 'country-code': '116' },
  { name: 'Cameroon', 'alpha-2': 'CM', 'country-code': '120' },
  { name: 'Canada', 'alpha-2': 'CA', 'country-code': '124' },
  { name: 'Cayman Islands', 'alpha-2': 'KY', 'country-code': '136' },
  { name: 'Central African Republic', 'alpha-2': 'CF', 'country-code': '140' },
  { name: 'Chad', 'alpha-2': 'TD', 'country-code': '148' },
  { name: 'Chile', 'alpha-2': 'CL', 'country-code': '152' },
  { name: 'China', 'alpha-2': 'CN', 'country-code': '156' },
  { name: 'Christmas Island', 'alpha-2': 'CX', 'country-code': '162' },
  { name: 'Cocos (Keeling) Islands', 'alpha-2': 'CC', 'country-code': '166' },
  { name: 'Colombia', 'alpha-2': 'CO', 'country-code': '170' },
  { name: 'Comoros', 'alpha-2': 'KM', 'country-code': '174' },
  { name: 'Congo', 'alpha-2': 'CG', 'country-code': '178' },
  {
    name: 'Congo, Democratic Republic of the',
    'alpha-2': 'CD',
    'country-code': '180',
  },
  { name: 'Cook Islands', 'alpha-2': 'CK', 'country-code': '184' },
  { name: 'Costa Rica', 'alpha-2': 'CR', 'country-code': '188' },
  { name: "Côte d'Ivoire", 'alpha-2': 'CI', 'country-code': '384' },
  { name: 'Croatia', 'alpha-2': 'HR', 'country-code': '191' },
  { name: 'Cuba', 'alpha-2': 'CU', 'country-code': '192' },
  { name: 'Curaçao', 'alpha-2': 'CW', 'country-code': '531' },
  { name: 'Cyprus', 'alpha-2': 'CY', 'country-code': '196' },
  { name: 'Czechia', 'alpha-2': 'CZ', 'country-code': '203' },
  { name: 'Denmark', 'alpha-2': 'DK', 'country-code': '208' },
  { name: 'Djibouti', 'alpha-2': 'DJ', 'country-code': '262' },
  { name: 'Dominica', 'alpha-2': 'DM', 'country-code': '212' },
  { name: 'Dominican Republic', 'alpha-2': 'DO', 'country-code': '214' },
  { name: 'Ecuador', 'alpha-2': 'EC', 'country-code': '218' },
  { name: 'Egypt', 'alpha-2': 'EG', 'country-code': '818' },
  { name: 'El Salvador', 'alpha-2': 'SV', 'country-code': '222' },
  { name: 'Equatorial Guinea', 'alpha-2': 'GQ', 'country-code': '226' },
  { name: 'Eritrea', 'alpha-2': 'ER', 'country-code': '232' },
  { name: 'Estonia', 'alpha-2': 'EE', 'country-code': '233' },
  { name: 'Eswatini', 'alpha-2': 'SZ', 'country-code': '748' },
  { name: 'Ethiopia', 'alpha-2': 'ET', 'country-code': '231' },
  {
    name: 'Falkland Islands (Malvinas)',
    'alpha-2': 'FK',
    'country-code': '238',
  },
  { name: 'Faroe Islands', 'alpha-2': 'FO', 'country-code': '234' },
  { name: 'Fiji', 'alpha-2': 'FJ', 'country-code': '242' },
  { name: 'Finland', 'alpha-2': 'FI', 'country-code': '246' },
  { name: 'France', 'alpha-2': 'FR', 'country-code': '250' },
  { name: 'French Guiana', 'alpha-2': 'GF', 'country-code': '254' },
  { name: 'French Polynesia', 'alpha-2': 'PF', 'country-code': '258' },
  {
    name: 'French Southern Territories',
    'alpha-2': 'TF',
    'country-code': '260',
  },
  { name: 'Gabon', 'alpha-2': 'GA', 'country-code': '266' },
  { name: 'Gambia', 'alpha-2': 'GM', 'country-code': '270' },
  { name: 'Georgia', 'alpha-2': 'GE', 'country-code': '268' },
  { name: 'Germany', 'alpha-2': 'DE', 'country-code': '276' },
  { name: 'Ghana', 'alpha-2': 'GH', 'country-code': '288' },
  { name: 'Gibraltar', 'alpha-2': 'GI', 'country-code': '292' },
  { name: 'Greece', 'alpha-2': 'GR', 'country-code': '300' },
  { name: 'Greenland', 'alpha-2': 'GL', 'country-code': '304' },
  { name: 'Grenada', 'alpha-2': 'GD', 'country-code': '308' },
  { name: 'Guadeloupe', 'alpha-2': 'GP', 'country-code': '312' },
  { name: 'Guam', 'alpha-2': 'GU', 'country-code': '316' },
  { name: 'Guatemala', 'alpha-2': 'GT', 'country-code': '320' },
  { name: 'Guernsey', 'alpha-2': 'GG', 'country-code': '831' },
  { name: 'Guinea', 'alpha-2': 'GN', 'country-code': '324' },
  { name: 'Guinea-Bissau', 'alpha-2': 'GW', 'country-code': '624' },
  { name: 'Guyana', 'alpha-2': 'GY', 'country-code': '328' },
  { name: 'Haiti', 'alpha-2': 'HT', 'country-code': '332' },
  {
    name: 'Heard Island and McDonald Islands',
    'alpha-2': 'HM',
    'country-code': '334',
  },
  { name: 'Holy See', 'alpha-2': 'VA', 'country-code': '336' },
  { name: 'Honduras', 'alpha-2': 'HN', 'country-code': '340' },
  { name: 'Hong Kong', 'alpha-2': 'HK', 'country-code': '344' },
  { name: 'Hungary', 'alpha-2': 'HU', 'country-code': '348' },
  { name: 'Iceland', 'alpha-2': 'IS', 'country-code': '352' },
  { name: 'India', 'alpha-2': 'IN', 'country-code': '356' },
  { name: 'Indonesia', 'alpha-2': 'ID', 'country-code': '360' },
  {
    name: 'Iran (Islamic Republic of)',
    'alpha-2': 'IR',
    'country-code': '364',
  },
  { name: 'Iraq', 'alpha-2': 'IQ', 'country-code': '368' },
  { name: 'Ireland', 'alpha-2': 'IE', 'country-code': '372' },
  { name: 'Isle of Man', 'alpha-2': 'IM', 'country-code': '833' },
  { name: 'Israel', 'alpha-2': 'IL', 'country-code': '376' },
  { name: 'Italy', 'alpha-2': 'IT', 'country-code': '380' },
  { name: 'Jamaica', 'alpha-2': 'JM', 'country-code': '388' },
  { name: 'Japan', 'alpha-2': 'JP', 'country-code': '392' },
  { name: 'Jersey', 'alpha-2': 'JE', 'country-code': '832' },
  { name: 'Jordan', 'alpha-2': 'JO', 'country-code': '400' },
  { name: 'Kazakhstan', 'alpha-2': 'KZ', 'country-code': '398' },
  { name: 'Kenya', 'alpha-2': 'KE', 'country-code': '404' },
  { name: 'Kiribati', 'alpha-2': 'KI', 'country-code': '296' },
  {
    name: "Korea (Democratic People's Republic of)",
    'alpha-2': 'KP',
    'country-code': '408',
  },
  { name: 'Korea, Republic of', 'alpha-2': 'KR', 'country-code': '410' },
  { name: 'Kuwait', 'alpha-2': 'KW', 'country-code': '414' },
  { name: 'Kyrgyzstan', 'alpha-2': 'KG', 'country-code': '417' },
  {
    name: "Lao People's Democratic Republic",
    'alpha-2': 'LA',
    'country-code': '418',
  },
  { name: 'Latvia', 'alpha-2': 'LV', 'country-code': '428' },
  { name: 'Lebanon', 'alpha-2': 'LB', 'country-code': '422' },
  { name: 'Lesotho', 'alpha-2': 'LS', 'country-code': '426' },
  { name: 'Liberia', 'alpha-2': 'LR', 'country-code': '430' },
  { name: 'Libya', 'alpha-2': 'LY', 'country-code': '434' },
  { name: 'Liechtenstein', 'alpha-2': 'LI', 'country-code': '438' },
  { name: 'Lithuania', 'alpha-2': 'LT', 'country-code': '440' },
  { name: 'Luxembourg', 'alpha-2': 'LU', 'country-code': '442' },
  { name: 'Macao', 'alpha-2': 'MO', 'country-code': '446' },
  { name: 'Madagascar', 'alpha-2': 'MG', 'country-code': '450' },
  { name: 'Malawi', 'alpha-2': 'MW', 'country-code': '454' },
  { name: 'Malaysia', 'alpha-2': 'MY', 'country-code': '458' },
  { name: 'Maldives', 'alpha-2': 'MV', 'country-code': '462' },
  { name: 'Mali', 'alpha-2': 'ML', 'country-code': '466' },
  { name: 'Malta', 'alpha-2': 'MT', 'country-code': '470' },
  { name: 'Marshall Islands', 'alpha-2': 'MH', 'country-code': '584' },
  { name: 'Martinique', 'alpha-2': 'MQ', 'country-code': '474' },
  { name: 'Mauritania', 'alpha-2': 'MR', 'country-code': '478' },
  { name: 'Mauritius', 'alpha-2': 'MU', 'country-code': '480' },
  { name: 'Mayotte', 'alpha-2': 'YT', 'country-code': '175' },
  { name: 'Mexico', 'alpha-2': 'MX', 'country-code': '484' },
  {
    name: 'Micronesia (Federated States of)',
    'alpha-2': 'FM',
    'country-code': '583',
  },
  { name: 'Moldova, Republic of', 'alpha-2': 'MD', 'country-code': '498' },
  { name: 'Monaco', 'alpha-2': 'MC', 'country-code': '492' },
  { name: 'Mongolia', 'alpha-2': 'MN', 'country-code': '496' },
  { name: 'Montenegro', 'alpha-2': 'ME', 'country-code': '499' },
  { name: 'Montserrat', 'alpha-2': 'MS', 'country-code': '500' },
  { name: 'Morocco', 'alpha-2': 'MA', 'country-code': '504' },
  { name: 'Mozambique', 'alpha-2': 'MZ', 'country-code': '508' },
  { name: 'Myanmar', 'alpha-2': 'MM', 'country-code': '104' },
  { name: 'Namibia', 'alpha-2': 'NA', 'country-code': '516' },
  { name: 'Nauru', 'alpha-2': 'NR', 'country-code': '520' },
  { name: 'Nepal', 'alpha-2': 'NP', 'country-code': '524' },
  { name: 'Netherlands', 'alpha-2': 'NL', 'country-code': '528' },
  { name: 'New Caledonia', 'alpha-2': 'NC', 'country-code': '540' },
  { name: 'New Zealand', 'alpha-2': 'NZ', 'country-code': '554' },
  { name: 'Nicaragua', 'alpha-2': 'NI', 'country-code': '558' },
  { name: 'Niger', 'alpha-2': 'NE', 'country-code': '562' },
  { name: 'Nigeria', 'alpha-2': 'NG', 'country-code': '566' },
  { name: 'Niue', 'alpha-2': 'NU', 'country-code': '570' },
  { name: 'Norfolk Island', 'alpha-2': 'NF', 'country-code': '574' },
  { name: 'North Macedonia', 'alpha-2': 'MK', 'country-code': '807' },
  { name: 'Northern Mariana Islands', 'alpha-2': 'MP', 'country-code': '580' },
  { name: 'Norway', 'alpha-2': 'NO', 'country-code': '578' },
  { name: 'Oman', 'alpha-2': 'OM', 'country-code': '512' },
  { name: 'Pakistan', 'alpha-2': 'PK', 'country-code': '586' },
  { name: 'Palau', 'alpha-2': 'PW', 'country-code': '585' },
  { name: 'Palestine, State of', 'alpha-2': 'PS', 'country-code': '275' },
  { name: 'Panama', 'alpha-2': 'PA', 'country-code': '591' },
  { name: 'Papua New Guinea', 'alpha-2': 'PG', 'country-code': '598' },
  { name: 'Paraguay', 'alpha-2': 'PY', 'country-code': '600' },
  { name: 'Peru', 'alpha-2': 'PE', 'country-code': '604' },
  { name: 'Philippines', 'alpha-2': 'PH', 'country-code': '608' },
  { name: 'Pitcairn', 'alpha-2': 'PN', 'country-code': '612' },
  { name: 'Poland', 'alpha-2': 'PL', 'country-code': '616' },
  { name: 'Portugal', 'alpha-2': 'PT', 'country-code': '620' },
  { name: 'Puerto Rico', 'alpha-2': 'PR', 'country-code': '630' },
  { name: 'Qatar', 'alpha-2': 'QA', 'country-code': '634' },
  { name: 'Réunion', 'alpha-2': 'RE', 'country-code': '638' },
  { name: 'Romania', 'alpha-2': 'RO', 'country-code': '642' },
  { name: 'Russian Federation', 'alpha-2': 'RU', 'country-code': '643' },
  { name: 'Rwanda', 'alpha-2': 'RW', 'country-code': '646' },
  { name: 'Saint Barthélemy', 'alpha-2': 'BL', 'country-code': '652' },
  {
    name: 'Saint Helena, Ascension and Tristan da Cunha',
    'alpha-2': 'SH',
    'country-code': '654',
  },
  { name: 'Saint Kitts and Nevis', 'alpha-2': 'KN', 'country-code': '659' },
  { name: 'Saint Lucia', 'alpha-2': 'LC', 'country-code': '662' },
  {
    name: 'Saint Martin (French part)',
    'alpha-2': 'MF',
    'country-code': '663',
  },
  { name: 'Saint Pierre and Miquelon', 'alpha-2': 'PM', 'country-code': '666' },
  {
    name: 'Saint Vincent and the Grenadines',
    'alpha-2': 'VC',
    'country-code': '670',
  },
  { name: 'Samoa', 'alpha-2': 'WS', 'country-code': '882' },
  { name: 'San Marino', 'alpha-2': 'SM', 'country-code': '674' },
  { name: 'Sao Tome and Principe', 'alpha-2': 'ST', 'country-code': '678' },
  { name: 'Saudi Arabia', 'alpha-2': 'SA', 'country-code': '682' },
  { name: 'Senegal', 'alpha-2': 'SN', 'country-code': '686' },
  { name: 'Serbia', 'alpha-2': 'RS', 'country-code': '688' },
  { name: 'Seychelles', 'alpha-2': 'SC', 'country-code': '690' },
  { name: 'Sierra Leone', 'alpha-2': 'SL', 'country-code': '694' },
  { name: 'Singapore', 'alpha-2': 'SG', 'country-code': '702' },
  { name: 'Sint Maarten (Dutch part)', 'alpha-2': 'SX', 'country-code': '534' },
  { name: 'Slovakia', 'alpha-2': 'SK', 'country-code': '703' },
  { name: 'Slovenia', 'alpha-2': 'SI', 'country-code': '705' },
  { name: 'Solomon Islands', 'alpha-2': 'SB', 'country-code': '090' },
  { name: 'Somalia', 'alpha-2': 'SO', 'country-code': '706' },
  { name: 'South Africa', 'alpha-2': 'ZA', 'country-code': '710' },
  {
    name: 'South Georgia and the South Sandwich Islands',
    'alpha-2': 'GS',
    'country-code': '239',
  },
  { name: 'South Sudan', 'alpha-2': 'SS', 'country-code': '728' },
  { name: 'Spain', 'alpha-2': 'ES', 'country-code': '724' },
  { name: 'Sri Lanka', 'alpha-2': 'LK', 'country-code': '144' },
  { name: 'Sudan', 'alpha-2': 'SD', 'country-code': '729' },
  { name: 'Suriname', 'alpha-2': 'SR', 'country-code': '740' },
  { name: 'Svalbard and Jan Mayen', 'alpha-2': 'SJ', 'country-code': '744' },
  { name: 'Sweden', 'alpha-2': 'SE', 'country-code': '752' },
  { name: 'Switzerland', 'alpha-2': 'CH', 'country-code': '756' },
  { name: 'Syrian Arab Republic', 'alpha-2': 'SY', 'country-code': '760' },
  { name: 'Taiwan, Province of China', 'alpha-2': 'TW', 'country-code': '158' },
  { name: 'Tajikistan', 'alpha-2': 'TJ', 'country-code': '762' },
  {
    name: 'Tanzania, United Republic of',
    'alpha-2': 'TZ',
    'country-code': '834',
  },
  { name: 'Thailand', 'alpha-2': 'TH', 'country-code': '764' },
  { name: 'Timor-Leste', 'alpha-2': 'TL', 'country-code': '626' },
  { name: 'Togo', 'alpha-2': 'TG', 'country-code': '768' },
  { name: 'Tokelau', 'alpha-2': 'TK', 'country-code': '772' },
  { name: 'Tonga', 'alpha-2': 'TO', 'country-code': '776' },
  { name: 'Trinidad and Tobago', 'alpha-2': 'TT', 'country-code': '780' },
  { name: 'Tunisia', 'alpha-2': 'TN', 'country-code': '788' },
  { name: 'Turkey', 'alpha-2': 'TR', 'country-code': '792' },
  { name: 'Turkmenistan', 'alpha-2': 'TM', 'country-code': '795' },
  { name: 'Turks and Caicos Islands', 'alpha-2': 'TC', 'country-code': '796' },
  { name: 'Tuvalu', 'alpha-2': 'TV', 'country-code': '798' },
  { name: 'Uganda', 'alpha-2': 'UG', 'country-code': '800' },
  { name: 'Ukraine', 'alpha-2': 'UA', 'country-code': '804' },
  { name: 'United Arab Emirates', 'alpha-2': 'AE', 'country-code': '784' },
  {
    name: 'United Kingdom of Great Britain and Northern Ireland',
    'alpha-2': 'GB',
    'country-code': '826',
  },
  { name: 'United States of America', 'alpha-2': 'US', 'country-code': '840' },
  {
    name: 'United States Minor Outlying Islands',
    'alpha-2': 'UM',
    'country-code': '581',
  },
  { name: 'Uruguay', 'alpha-2': 'UY', 'country-code': '858' },
  { name: 'Uzbekistan', 'alpha-2': 'UZ', 'country-code': '860' },
  { name: 'Vanuatu', 'alpha-2': 'VU', 'country-code': '548' },
  {
    name: 'Venezuela (Bolivarian Republic of)',
    'alpha-2': 'VE',
    'country-code': '862',
  },
  { name: 'Viet Nam', 'alpha-2': 'VN', 'country-code': '704' },
  { name: 'Virgin Islands (British)', 'alpha-2': 'VG', 'country-code': '092' },
  { name: 'Virgin Islands (U.S.)', 'alpha-2': 'VI', 'country-code': '850' },
  { name: 'Wallis and Futuna', 'alpha-2': 'WF', 'country-code': '876' },
  { name: 'Western Sahara', 'alpha-2': 'EH', 'country-code': '732' },
  { name: 'Yemen', 'alpha-2': 'YE', 'country-code': '887' },
  { name: 'Zambia', 'alpha-2': 'ZM', 'country-code': '894' },
  { name: 'Zimbabwe', 'alpha-2': 'ZW', 'country-code': '716' },
]

const StateList = [
  { name: 'Улаанбаатар' },
  { name: 'Архангай' },
  { name: 'Баян-Өлгий' },
  { name: 'Баянхонгор' },
  { name: 'Булган' },
  { name: 'Говь-Алтай' },
  { name: 'Говьсүмбэр' },
  { name: 'Дархан-Уул' },
  { name: 'Дорноговь' },
  { name: 'Дорнод' },
  { name: 'Дундговь' },
  { name: 'Завхан' },
  { name: 'Орхон' },
  { name: 'Өвөрхангай' },
  { name: 'Өмнөговь' },
  { name: 'Сүхбаатар' },
  { name: 'Сэлэнгэ' },
  { name: 'Төв' },
  { name: 'Увс' },
  { name: 'Ховд' },
  { name: 'Хөвсгөл' },
  { name: 'Хэнтий' },
]

const DistrictList = [
  { name: 'Багануур' },
  { name: 'Багахангай' },
  { name: 'Баянгол' },
  { name: 'Баянзүрх' },
  { name: 'Найлах' },
  { name: 'Сонгинохайрхан' },
  { name: 'Сүхбаатар' },
  { name: 'Хан-Уул' },
  { name: 'Чингэлтэй' },
]

const ValuesetRelationship = [
  {
    code: 'C',
    display: 'Emergency Contact',
  },
  {
    code: 'E',
    display: 'Employer',
  },
  {
    code: 'F',
    display: 'Federal Agency',
  },
  {
    code: 'I',
    display: 'Insurance Company',
  },
  {
    code: 'N',
    display: 'Next-of-Kin',
  },
  {
    code: 'S',
    display: 'State Agency',
  },
  {
    code: 'U',
    display: 'Unknown',
  },
]

const ContactPointUse = [
  {
    code: 'home',
    display: 'Home',
    definition:
      'A communication contact point at a home; attempted contacts for business purposes might intrude privacy and chances are one will contact family or other household members instead of the person one wishes to call. Typically used with urgent cases, or if no other contacts are available.',
  },
  {
    code: 'work',
    display: 'Work',
    definition:
      'An office contact point. First choice for business related contacts during business hours.',
  },
  {
    code: 'temp',
    display: 'Temp',
    definition:
      'A temporary contact point. The period can provide more detailed information.',
  },
  {
    code: 'old',
    display: 'Old',
    definition:
      'This contact point is no longer in use (or was never correct, but retained for records).',
  },
  {
    code: 'mobile',
    display: 'Mobile',
    definition:
      'A telecommunication device that moves and stays with its owner. May have characteristics of all other use codes, suitable for urgent matters, not the first choice for routine business.',
  },
]

const ContactPointRank = [
  {
    code: 1,
    display: '1',
  },
  {
    code: 2,
    display: '2',
  },
  {
    code: 3,
    display: '3',
  },
  {
    code: 4,
    display: '4',
  },
  {
    code: 5,
    display: '5',
  },
]

const ValuesetMaritalStatus = [
  {
    code: 'A',
    system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
    display: 'Annulled',
    definition:
      'Marriage contract has been declared null and to not have existed',
  },
  {
    code: 'D',
    system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
    display: 'Divorced',
    definition: 'Marriage contract has been declared dissolved and inactive',
  },
  {
    code: 'I',
    system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
    display: 'Interlocutory',
    definition: 'Subject to an Interlocutory Decree.',
  },
  {
    code: 'L',
    system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
    display: 'Legally Separated',
    definition: 'Legally Separated',
  },
  {
    code: 'M',
    system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
    display: 'Married',
    definition: 'A current marriage contract is active',
  },
  {
    code: 'P',
    system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
    display: 'Polygamous',
    definition: 'More than 1 current spouse',
  },
  {
    code: 'S',
    system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
    display: 'Never Married',
    definition: 'No marriage contract has ever been entered',
  },
  {
    code: 'T',
    system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
    display: 'Domestic partner',
    definition: 'Person declares that a domestic partner relationship exists.',
  },
  {
    code: 'U',
    system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
    display: 'unmarried',
    definition: 'Currently not in a marriage contract.',
  },
  {
    code: 'W',
    system: 'http://terminology.hl7.org/CodeSystem/v3-MaritalStatus',
    display: 'Widowed',
    definition: 'The spouse has died',
  },
  {
    code: 'UNK',
    system: 'http://terminology.hl7.org/CodeSystem/v3-NullFlavor',
    display: 'unknown',
    definition:
      'Description:A proper value is applicable, but not known. Usage Notes: This means the actual value is not known. If the only thing that is unknown is how to properly express the value in the necessary constraints (value set, datatype, etc.), then the OTH or UNC flavor should be used. No properties should be included for a datatype with this property unless: Those properties themselves directly translate to a semantic of "unknown". (E.g. a local code sent as a translation that conveys \'unknown\') Those properties further qualify the nature of what is unknown. (E.g. specifying a use code of "H" and a URL prefix of "tel:" to convey that it is the home phone number that is unknown.)',
  },
]

const ValuesetLanguages = [
  {
    code: 'bn',
    display: 'Bengali',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Bengali',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Bengaals',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Бенгальский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '孟加拉语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Bengalisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Bengalsk',
      },
    ],
  },
  {
    code: 'cs',
    display: 'Czech',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Czech',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Tsjechisch',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Чешский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '捷克语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Tschechisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Tjekkisk',
      },
    ],
  },
  {
    code: 'da',
    display: 'Danish',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Danish',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Deens',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Датский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '丹麦语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Dänisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Dansk',
      },
    ],
  },
  {
    code: 'de',
    display: 'German',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'German',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Duits',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Немецкий',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '德语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Deutsch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Tysk',
      },
    ],
  },
  {
    code: 'de-AT',
    display: 'German (Austria)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'German (Austria)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Duits (Oostenrijk)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Немецкий (Австрия)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '德语 （奥地利）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Deutsch (Österreich)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Tysk (Østrig',
      },
    ],
  },
  {
    code: 'de-CH',
    display: 'German (Switzerland)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'German (Switzerland)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Duits (Zwitserland)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Немецкий (Швейцария)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '德语 （瑞士）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Deutsch (Schweiz)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Tysk (Schweiz)',
      },
    ],
  },
  {
    code: 'de-DE',
    display: 'German (Germany)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'German (Germany)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Duits (Duitsland)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Немецкий (Германия)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '德语 （德国）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Deutsch (Deutschland)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Tysk (Tyskland)',
      },
    ],
  },
  {
    code: 'el',
    display: 'Greek',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Greek',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Grieks',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Греческий',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '希腊语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Griechisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Græsk',
      },
    ],
  },
  {
    code: 'en',
    display: 'English',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'English',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Engels',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Английский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '英语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Englisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Engelsk',
      },
    ],
  },
  {
    code: 'en-AU',
    display: 'English (Australia)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'English (Australia)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Engels (Australië)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Английский (Австралия)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '英语 （澳大利亚）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Englisch (Australien)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Engelsk (Australien)',
      },
    ],
  },
  {
    code: 'en-CA',
    display: 'English (Canada)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'English (Canada)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Engels (Canada)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Английский (Канада)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '英语 （加拿大）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Englisch (Kanada)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Engelsk (Canada)',
      },
    ],
  },
  {
    code: 'en-GB',
    display: 'English (Great Britain)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'English (Great Britain)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Engels (Groot Brittannië)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Английский (Великобритания)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '英语 （英国）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Englisch (Großbritannien)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Engelsk (Storbritannien)',
      },
    ],
  },
  {
    code: 'en-IN',
    display: 'English (India)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'English (India)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Engels (India)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Английский (Индия)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '英语 （印度）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Englisch (Indien)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Engelsk (Indien)',
      },
    ],
  },
  {
    code: 'en-NZ',
    display: 'English (New Zeland)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'English (New Zeland)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Engels (Nieuw Zeeland)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Английский (Новая Зеландия)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '英语 （新西兰）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Englisch (Neuseeland)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Engelsk (New Zeeland)',
      },
    ],
  },
  {
    code: 'en-SG',
    display: 'English (Singapore)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'English (Singapore)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Engels (Singapore)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Английский (Сингапур)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '英语 （新加坡）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Englisch (Singapur)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Engelsk (Singapore)',
      },
    ],
  },
  {
    code: 'en-US',
    display: 'English (United States)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'English (United States)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Engels (Verenigde Staten)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Английский (США)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '英语 （美国）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Englisch (USA)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Engelsk (Amerikansk)',
      },
    ],
  },
  {
    code: 'es',
    display: 'Spanish',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Spanish',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Spaans',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Испанский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '西班牙语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Spanisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Spansk',
      },
    ],
  },
  {
    code: 'es-AR',
    display: 'Spanish (Argentina)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Spanish (Argentina)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Spaans (Argentinië)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Испанский (Аргентина)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '西班牙语 （阿根廷）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Spanisch (Argentinien)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Spansk (Argentina)',
      },
    ],
  },
  {
    code: 'es-ES',
    display: 'Spanish (Spain)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Spanish (Spain)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Spaans (Spanje)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Испанский (Испания)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '西班牙语 （西班牙）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Spanisch (Spanien)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Spansk (Spanien)',
      },
    ],
  },
  {
    code: 'es-UY',
    display: 'Spanish (Uruguay)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Spanish (Uruguay)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Spaans (Uruguay)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Испанский (Уругвай)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '西班牙语 （乌拉圭）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Spanisch (Uruguay)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Spansk (Uruguay)',
      },
    ],
  },
  {
    code: 'fi',
    display: 'Finnish',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Finnish',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Fins',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Финский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '芬兰语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Finnisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Finsk',
      },
    ],
  },
  {
    code: 'fr',
    display: 'French',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'French',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Frans',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Французский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '法语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Französisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Fransk',
      },
    ],
  },
  {
    code: 'fr-BE',
    display: 'French (Belgium)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'French (Belgium)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Frans (België)',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Französisch (Belgien)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Finsk (Belgien)',
      },
    ],
  },
  {
    code: 'fr-CH',
    display: 'French (Switzerland)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'French (Switzerland)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Frans (Zwitserland)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Французский (Швейцария)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '法语 （比利时）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Französisch (Schweiz)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Fransk (Schweiz)',
      },
    ],
  },
  {
    code: 'fr-FR',
    display: 'French (France)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'French (France)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Frans (Frankrijk)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Французский (Франция)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '法语 （瑞士）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Französisch (Frankreich)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Fransk (Frankrig)',
      },
    ],
  },
  {
    code: 'fy',
    display: 'Frysian',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Frysian',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Fries',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '弗里士兰语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Friesisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Frisisk',
      },
    ],
  },
  {
    code: 'fy-NL',
    display: 'Frysian (Netherlands)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Frysian (Netherlands)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Fries (Nederland)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '弗里士兰语（荷兰）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Friesisch (Niederlande)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Frisisk (Holland)',
      },
    ],
  },
  {
    code: 'hi',
    display: 'Hindi',
    designation: [
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Hindi',
      },
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Hindi',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Hindi',
      },
    ],
  },
  {
    code: 'hr',
    display: 'Croatian',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Croatian',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Kroatisch',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Хорватский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '克罗地亚语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Kroatisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Kroatisk',
      },
    ],
  },
  {
    code: 'it',
    display: 'Italian',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Italian',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Italiaans',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Итальянский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '意大利语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Italienisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Italiensk',
      },
    ],
  },
  {
    code: 'it-CH',
    display: 'Italian (Switzerland)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Italian (Switzerland)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Italiaans (Zwitserland)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Итальянский (Швейцария)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '意大利语 （瑞士）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Italienisch (Schweiz)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Italiensk (Schweiz)',
      },
    ],
  },
  {
    code: 'it-IT',
    display: 'Italian (Italy)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Italian (Italy)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Italiaans (Italië)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Итальянский (Италия)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '意大利语 （意大利）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Italienisch (Italien)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Italiensk (Italien)',
      },
    ],
  },
  {
    code: 'ja',
    display: 'Japanese',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Japanese',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Japans',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Японский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '日语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Japanisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Japansk',
      },
    ],
  },
  {
    code: 'ko',
    display: 'Korean',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Korean',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Koreaans',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Корейский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '朝鲜语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Koreanisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Koreansk',
      },
    ],
  },
  {
    code: 'nl',
    display: 'Dutch',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Dutch',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Nederlands',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нидерландский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '荷兰语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Niederländisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Hollandsk',
      },
    ],
  },
  {
    code: 'nl-BE',
    display: 'Dutch (Belgium)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Dutch (Belgium)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Nederlands (België)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '荷兰语 （比利时）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Niederländisch (Belgien)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Hollandsk (Belgien)',
      },
    ],
  },
  {
    code: 'nl-NL',
    display: 'Dutch (Netherlands)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Dutch (Netherlands)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Nederlands (Nederland)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Нидерландский (Нидерланды)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '荷兰语 （荷兰）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Niederländisch (Niederlande)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Hollandsk (Holland)',
      },
    ],
  },
  {
    code: 'no',
    display: 'Norwegian',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Norwegian',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Noors',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Норвежский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '挪威语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Norwegisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Norsk',
      },
    ],
  },
  {
    code: 'no-NO',
    display: 'Norwegian (Norway)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Norwegian (Norway)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Noors (Noorwegen)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Норвежский (Норвегия)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '挪威语 （挪威）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Norwegisch (Norwegen)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Norsk (Norge)',
      },
    ],
  },
  {
    code: 'pa',
    display: 'Punjabi',
    designation: [
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Punjabi',
      },
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Punjabi',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Punjabi',
      },
    ],
  },
  {
    code: 'pl',
    display: 'Polish',
    designation: [
      {
        language: 'pl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Polskie',
      },
    ],
  },
  {
    code: 'pt',
    display: 'Portuguese',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Portuguese',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Portugees',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Португальский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '葡萄牙语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Portugiesisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Portugisisk',
      },
    ],
  },
  {
    code: 'pt-BR',
    display: 'Portuguese (Brazil)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Portuguese (Brazil)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Portugees (Brazilië)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Португальский (Бразилия)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '葡萄牙语 （巴西）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Portugiesisch (Brasilien)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Portugisisk (Brasilien)',
      },
    ],
  },
  {
    code: 'ru',
    display: 'Russian',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Russian',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Russisch',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Русский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '俄语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Russisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Russisk',
      },
    ],
  },
  {
    code: 'ru-RU',
    display: 'Russian (Russia)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Russian (Russia)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Russisch (Rusland)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Русский (Россия)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '俄语 （俄罗斯）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Russisch (Russland)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Russisk (Rusland)',
      },
    ],
  },
  {
    code: 'sr',
    display: 'Serbian',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Serbian',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Servisch',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Сербский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '塞尔维亚语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Serbisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Serbisk',
      },
    ],
  },
  {
    code: 'sr-RS',
    display: 'Serbian (Serbia)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Serbian (Serbia)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Servisch (Servië)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Сербский (Сербия)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '塞尔维亚语 （塞尔维亚）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Serbisch (Serbien)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Serbisk (Serbien)',
      },
    ],
  },
  {
    code: 'sv',
    display: 'Swedish',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Swedish',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Zweeds',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Шведский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '瑞典语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Schwedisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Svensk',
      },
    ],
  },
  {
    code: 'sv-SE',
    display: 'Swedish (Sweden)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Swedish (Sweden)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Zweeds (Zweden)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Шведский (Швеция)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '瑞典语 （瑞典）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Schwedisch (Schweden)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Svensk (Sverige)',
      },
    ],
  },
  {
    code: 'te',
    display: 'Telegu',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Telegu',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Teloegoe',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Телугу',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '泰卢固语',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Telugu',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Telugu',
      },
    ],
  },
  {
    code: 'zh',
    display: 'Chinese',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Chinese',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Chinees',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Kитайский',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '中文',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Chinesisch',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Kinesisk',
      },
    ],
  },
  {
    code: 'zh-CN',
    display: 'Chinese (China)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Chinese (China)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Chinees (China)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Kитайский (Китай)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '中文 （中国）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Chinesisch (China)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Kinesisk (Kina)',
      },
    ],
  },
  {
    code: 'zh-HK',
    display: 'Chinese (Hong Kong)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Chinese (Hong Kong)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Chinees (Hong Kong)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Kитайский (Гонконг)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '中文 （香港特别行政区）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Chinesisch (Hong Kong)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Kinesisk (Hong Kong)',
      },
    ],
  },
  {
    code: 'zh-SG',
    display: 'Chinese (Singapore)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Chinese (Singapore)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Chinees (Singapore)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Kитайский (Сингапур)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '中文 （新加坡）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Chinesisch (Singapur)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Kinesisk (Singapore)',
      },
    ],
  },
  {
    code: 'zh-TW',
    display: 'Chinese (Taiwan)',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Chinese (Taiwan)',
      },
      {
        language: 'nl',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Chinees (Taiwan)',
      },
      {
        language: 'ru',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Kитайский (Тайвань)',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: '中文 （台湾）',
      },
      {
        language: 'de',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Chinesisch (Taiwan)',
      },
      {
        language: 'da',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Kinesisk (Taiwan)',
      },
    ],
  },
]

const ValuesetQualificationCode = [
  {
    code: 'AA',
    display: 'Associate of Arts',
  },
  {
    code: 'AAS',
    display: 'Associate of Applied Science',
  },
  {
    code: 'ABA',
    display: 'Associate of Business Administration',
  },
  {
    code: 'AE',
    display: 'Associate of Engineering',
  },
  {
    code: 'AS',
    display: 'Associate of Science',
  },
  {
    code: 'BA',
    display: 'Bachelor of Arts',
  },
  {
    code: 'BBA',
    display: 'Bachelor of Business Administration',
  },
  {
    code: 'BE',
    display: 'Bachelor or Engineering',
  },
  {
    code: 'BFA',
    display: 'Bachelor of Fine Arts',
  },
  {
    code: 'BN',
    display: 'Bachelor of Nursing',
  },
  {
    code: 'BS',
    display: 'Bachelor of Science',
  },
  {
    code: 'BSL',
    display: 'Bachelor of Science - Law',
  },
  {
    code: 'BSN',
    display: 'Bachelor on Science - Nursing',
  },
  {
    code: 'BT',
    display: 'Bachelor of Theology',
  },
  {
    code: 'CANP',
    display: 'Certified Adult Nurse Practitioner',
  },
  {
    code: 'CER',
    display: 'Certificate',
  },
  {
    code: 'CMA',
    display: 'Certified Medical Assistant',
  },
  {
    code: 'CNM',
    display: 'Certified Nurse Midwife',
  },
  {
    code: 'CNP',
    display: 'Certified Nurse Practitioner',
  },
  {
    code: 'CNS',
    display: 'Certified Nurse Specialist',
  },
  {
    code: 'CPNP',
    display: 'Certified Pediatric Nurse Practitioner',
  },
  {
    code: 'CRN',
    display: 'Certified Registered Nurse',
  },
  {
    code: 'CTR',
    display: 'Certified Tumor Registrar',
  },
  {
    code: 'DBA',
    display: 'Doctor of Business Administration',
  },
  {
    code: 'DED',
    display: 'Doctor of Education',
  },
  {
    code: 'DIP',
    display: 'Diploma',
  },
  {
    code: 'DO',
    display: 'Doctor of Osteopathy',
  },
  {
    code: 'EMT',
    display: 'Emergency Medical Technician',
  },
  {
    code: 'EMTP',
    display: 'Emergency Medical Technician - Paramedic',
  },
  {
    code: 'FPNP',
    display: 'Family Practice Nurse Practitioner',
  },
  {
    code: 'HS',
    display: 'High School Graduate',
  },
  {
    code: 'JD',
    display: 'Juris Doctor',
  },
  {
    code: 'MA',
    display: 'Master of Arts',
  },
  {
    code: 'MBA',
    display: 'Master of Business Administration',
  },
  {
    code: 'MCE',
    display: 'Master of Civil Engineering',
  },
  {
    code: 'MD',
    display: 'Doctor of Medicine',
  },
  {
    code: 'MDA',
    display: 'Medical Assistant',
  },
  {
    code: 'MDI',
    display: 'Master of Divinity',
  },
  {
    code: 'ME',
    display: 'Master of Engineering',
  },
  {
    code: 'MED',
    display: 'Master of Education',
  },
  {
    code: 'MEE',
    display: 'Master of Electrical Engineering',
  },
  {
    code: 'MFA',
    display: 'Master of Fine Arts',
  },
  {
    code: 'MME',
    display: 'Master of Mechanical Engineering',
  },
  {
    code: 'MS',
    display: 'Master of Science',
  },
  {
    code: 'MSL',
    display: 'Master of Science - Law',
  },
  {
    code: 'MSN',
    display: 'Master of Science - Nursing',
  },
  {
    code: 'MT',
    display: 'Medical Technician',
  },
  {
    code: 'MTH',
    display: 'Master of Theology',
  },
  {
    code: 'NG',
    display: 'Non-Graduate',
  },
  {
    code: 'NP',
    display: 'Nurse Practitioner',
  },
  {
    code: 'PA',
    display: 'Physician Assistant',
  },
  {
    code: 'PHD',
    display: 'Doctor of Philosophy',
  },
  {
    code: 'PHE',
    display: 'Doctor of Engineering',
  },
  {
    code: 'PHS',
    display: 'Doctor of Science',
  },
  {
    code: 'PN',
    display: 'Advanced Practice Nurse',
  },
  {
    code: 'PharmD',
    display: 'Doctor of Pharmacy',
  },
  {
    code: 'RMA',
    display: 'Registered Medical Assistant',
  },
  {
    code: 'RN',
    display: 'Registered Nurse',
  },
  {
    code: 'RPH',
    display: 'Registered Pharmacist',
  },
  {
    code: 'SEC',
    display: 'Secretarial Certificate',
  },
  {
    code: 'TS',
    display: 'Trade School Graduate',
  },
]

const LocationCascaderOptions = [
  {
    value: 'mongolia',
    label: 'Mongolia',
    children: [
      {
        value: 'ulaanbaatar',
        label: 'Ulaanbaatar',
        children: [
          {
            value: 'khan-uul',
            label: 'Khan-uul',
          },
          {
            value: 'sukhbaatar',
            label: 'Sukhbaatar',
          },
          {
            value: 'baganuur',
            label: 'Baganuur',
            disabled: true,
          },
        ],
      },
      {
        value: 'arkhangai',
        label: 'Arkhangai',
        children: [
          {
            value: 'bulgan',
            label: 'Bulgan',
          },
        ],
      },
    ],
  },
  {
    value: 'japan',
    label: 'Japan',
    children: [
      {
        value: 'tokyo',
        label: 'Tokyo',
        disabled: true,
      },
    ],
  },
]

const LocationMongolia = [
  {
    value: 'ulaanbaatar',
    label: 'Ulaanbaatar',
    children: [
      {
        value: 'khan-uul',
        label: 'Khan-uul',
      },
      {
        value: 'sukhbaatar',
        label: 'Sukhbaatar',
      },
      {
        value: 'baganuur',
        label: 'Baganuur',
        disabled: true,
      },
    ],
  },
  {
    value: 'arkhangai',
    label: 'Arkhangai',
    children: [
      {
        value: 'bulgan',
        label: 'Bulgan',
      },
    ],
  },
]

const ValuesetResourceTypes = [
  {
    code: 'Account',
    display: 'Account',
    definition:
      'A financial tool for tracking value accrued for a particular purpose.  In the healthcare field, used to track charges for a patient, cost centers, etc.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Account',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Cuenta',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è´¦æˆ·',
      },
    ],
  },
  {
    code: 'ActivityDefinition',
    display: 'ActivityDefinition',
    definition:
      'This resource allows for the definition of some activity to be performed, independent of a particular patient, practitioner, or other performance context.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ActivityDefinition',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefinizioneAttivita',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefinicionDeActividad',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ´»åŠ¨å®šä¹‰',
      },
    ],
  },
  {
    code: 'AdverseEvent',
    display: 'AdverseEvent',
    definition:
      'Actual or  potential/avoided event causing unintended physical injury resulting from or contributed to by medical care, a research study or other healthcare setting factors that requires additional monitoring, treatment, or hospitalization, or that results in death.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'AdverseEvent',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EventoAvverso',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EventoAdverso',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ä¸�è‰¯äº‹ä»¶',
      },
    ],
  },
  {
    code: 'AllergyIntolerance',
    display: 'AllergyIntolerance',
    definition:
      'Risk of harmful or undesirable, physiological response which is unique to an individual and associated with exposure to a substance.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'AllergyIntolerance',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'AllergiaIntolleranza',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'IntolÃ©ranceAllergique',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'AllergiaIntolerancia',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'å�˜æ€�å��åº”ä¸Žä¸�è€�æ€§',
      },
    ],
  },
  {
    code: 'Appointment',
    display: 'Appointment',
    definition:
      'A booking of a healthcare event among patient(s), practitioner(s), related person(s) and/or device(s) for a specific date/time. This may result in one or more Encounter(s).',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Appointment',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Appuntamento',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RendezVous',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Cita',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'é¢„çº¦',
      },
    ],
  },
  {
    code: 'AppointmentResponse',
    display: 'AppointmentResponse',
    definition:
      'A reply to an appointment request for a patient and/or practitioner(s), such as a confirmation or rejection.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'AppointmentResponse',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RispostaAppuntamento',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RÃ©ponseRendezVous',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'CitaRespuesta',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'é¢„çº¦å“�åº”',
      },
    ],
  },
  {
    code: 'AuditEvent',
    display: 'AuditEvent',
    definition:
      'A record of an event made for purposes of maintaining a security log. Typical uses include detection of intrusion attempts and monitoring for inappropriate usage.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'AuditEvent',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Ã‰vÃ¨nementSÃ©curitÃ©',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EventoSeguridad',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'å®¡è®¡äº‹ä»¶',
      },
    ],
  },
  {
    code: 'Basic',
    display: 'Basic',
    definition:
      "Basic is used for handling concepts not yet defined in FHIR, narrative-only resources that don't map to an existing resource, and custom resources not appropriate for inclusion in the FHIR specification.",
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Basic',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Basique',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Basico',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'åˆ�çº§èµ„æº�',
      },
    ],
  },
  {
    code: 'Binary',
    display: 'Binary',
    definition:
      'A resource that represents the data of a single raw artifact as digital content accessible in its native format.  A Binary resource can contain any content, whether text, image, pdf, zip archive, etc.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Binary',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Binario',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Binaire',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Binario',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'äºŒè¿›åˆ¶èµ„æº�',
      },
    ],
  },
  {
    code: 'BiologicallyDerivedProduct',
    display: 'BiologicallyDerivedProduct',
    definition:
      'A material substance originating from a biological entity intended to be transplanted or infused\ninto another (possibly the same) biological entity.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'BiologicallyDerivedProduct',
      },
    ],
  },
  {
    code: 'BodyStructure',
    display: 'BodyStructure',
    definition:
      'Record details about an anatomical structure.  This resource may be used when a coded concept does not provide the necessary detail needed for the use case.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'BodyStructure',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'StrutturaDelCorpo',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MorphologieDeCorps',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EstructuraDelCuerpo',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'èº«ä½“ç»“æž„',
      },
    ],
  },
  {
    code: 'Bundle',
    display: 'Bundle',
    definition: 'A container for a collection of resources.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Bundle',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Paquet',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Paquete',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ�†æ�Ÿ',
      },
    ],
  },
  {
    code: 'CapabilityStatement',
    display: 'CapabilityStatement',
    definition:
      'A Capability Statement documents a set of capabilities (behaviors) of a FHIR Server for a particular version of FHIR that may be used as a statement of actual server functionality or a statement of required or desired server implementation.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'CapabilityStatement',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DeclaracionDeCapacidad',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'èƒ½åŠ›å£°æ˜Ž',
      },
    ],
  },
  {
    code: 'CarePlan',
    display: 'CarePlan',
    definition:
      'Describes the intention of how one or more practitioners intend to deliver care for a particular patient, group or community for a period of time, possibly limited to care for a specific condition or set of conditions.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'CarePlan',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'PianoDiCura',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'PlanDeSoins',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'PlanDeCuidado',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ç…§æŠ¤è®¡åˆ’',
      },
    ],
  },
  {
    code: 'CareTeam',
    display: 'CareTeam',
    definition:
      'The Care Team includes all the people and organizations who plan to participate in the coordination and delivery of care for a patient.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'CareTeam',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EquipoDeCuidado',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ç…§æŠ¤å›¢é˜Ÿ',
      },
    ],
  },
  {
    code: 'CatalogEntry',
    display: 'CatalogEntry',
    definition:
      'Catalog entries are wrappers that contextualize items included in a catalog.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'CatalogEntry',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EntradaDeCatalogo',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ�¡ç›®å®šä¹‰',
      },
    ],
  },
  {
    code: 'ChargeItem',
    display: 'ChargeItem',
    definition:
      'The resource ChargeItem describes the provision of healthcare provider products for a certain patient, therefore referring not only to the product, but containing in addition details of the provision, like date, time, amounts and participating organizations and persons. Main Usage of the ChargeItem is to enable the billing process and internal cost allocation.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ChargeItem',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'CargoDeItem',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ”¶è´¹é¡¹ç›®',
      },
    ],
  },
  {
    code: 'ChargeItemDefinition',
    display: 'ChargeItemDefinition',
    definition:
      'The ChargeItemDefinition resource provides the properties that apply to the (billing) codes necessary to calculate costs and prices. The properties may differ largely depending on type and realm, therefore this resource gives only a rough structure and requires profiling for each type of billing code system.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ChargeItemDefinition',
      },
    ],
  },
  {
    code: 'Claim',
    display: 'Claim',
    definition:
      'A provider issued list of professional services and products which have been provided, or are to be provided, to a patient which is sent to an insurer for reimbursement.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Claim',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RÃ©clamation',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ReclamaciÃ³n / Factura',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'èµ”å�•',
      },
    ],
  },
  {
    code: 'ClaimResponse',
    display: 'ClaimResponse',
    definition:
      'This resource provides the adjudication details from the processing of a Claim resource.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ClaimResponse',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RÃ©ponseARÃ©clamation',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'èµ”å�•è¯·æ±‚',
      },
    ],
  },
  {
    code: 'ClinicalImpression',
    display: 'ClinicalImpression',
    definition:
      'A record of a clinical assessment performed to determine what problem(s) may affect the patient and before planning the treatments or management strategies that are best to manage a patient\'s condition. Assessments are often 1:1 with a clinical consultation / encounter,  but this varies greatly depending on the clinical workflow. This resource is called "ClinicalImpression" rather than "ClinicalAssessment" to avoid confusion with the recording of assessment tools such as Apgar score.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ClinicalImpression',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ImpressioneClinica',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ImpressionClinique',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'HallazgoClinico',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ä¸´åºŠå�°è±¡',
      },
    ],
  },
  {
    code: 'CodeSystem',
    display: 'CodeSystem',
    definition:
      'The CodeSystem resource is used to declare the existence of and describe a code system or code system supplement and its key properties, and optionally define a part or all of its content.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'CodeSystem',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SistemaDiCodifica',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SistemaDeCodigos',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ä»£ç �ç³»ç»Ÿ',
      },
    ],
  },
  {
    code: 'Communication',
    display: 'Communication',
    definition:
      'An occurrence of information being transmitted; e.g. an alert that was sent to a responsible provider, a public health agency that was notified about a reportable condition.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Communication',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Comunicazione',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Communication',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ComunicaciÃ³n',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'é€šè®¯',
      },
    ],
  },
  {
    code: 'CommunicationRequest',
    display: 'CommunicationRequest',
    definition:
      'A request to convey information; e.g. the CDS system proposes that an alert be sent to a responsible provider, the CDS system proposes that the public health agency be notified about a reportable condition.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'CommunicationRequest',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RichiestaDiComunicazione',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DemandeDeCommunication',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ComunicaciÃ³nRequerimiento',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'é€šè®¯è¯·æ±‚',
      },
    ],
  },
  {
    code: 'CompartmentDefinition',
    display: 'CompartmentDefinition',
    definition:
      'A compartment definition that defines how resources are accessed on a server.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'CompartmentDefinition',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefinicionDeCompartimento',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'é€»è¾‘åŒºå�—å®šä¹‰',
      },
    ],
  },
  {
    code: 'Composition',
    display: 'Composition',
    definition:
      'A set of healthcare-related information that is assembled together into a single logical package that provides a single coherent statement of meaning, establishes its own context and that has clinical attestation with regard to who is making the statement. A Composition defines the structure and narrative content necessary for a document. However, a Composition alone does not constitute a document. Rather, the Composition must be the first entry in a Bundle where Bundle.type=document, and any other resources referenced from Composition must be included as subsequent entries in the Bundle (for example Patient, Practitioner, Encounter, etc.).',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Composition',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Composizione',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Composition',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ComposiciÃ³n',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ç»„å�ˆå¼�æ–‡ä¹¦',
      },
    ],
  },
  {
    code: 'ConceptMap',
    display: 'ConceptMap',
    definition:
      'A statement of relationships from one set of concepts to one or more other concepts - either concepts in code systems, or data element/data element concepts, or classes in class models.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ConceptMap',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MappaDiConcetti',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'CarteDeConcepts',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MapaDeConceptos',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ¦‚å¿µæ˜ å°„',
      },
    ],
  },
  {
    code: 'Condition',
    display: 'Condition',
    definition:
      'A clinical condition, problem, diagnosis, or other event, situation, issue, or clinical concept that has risen to a level of concern.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Condition',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Condizione',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Condition',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'CondiciÃ³n',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æƒ…å†µ',
      },
    ],
  },
  {
    code: 'Consent',
    display: 'Consent',
    definition:
      'A record of a healthcare consumerâ€™s  choices, which permits or denies identified recipient(s) or recipient role(s) to perform one or more actions within a given policy context, for specific purposes and periods of time.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Consent',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Consenso',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Consentimiento',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'å�Œæ„�ä¹¦',
      },
    ],
  },
  {
    code: 'Contract',
    display: 'Contract',
    definition:
      'Legally enforceable, formally recorded unilateral or bilateral directive i.e., a policy or agreement.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Contract',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Contratto',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Contrat',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Contato',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'å�ˆå�Œ',
      },
    ],
  },
  {
    code: 'Coverage',
    display: 'Coverage',
    definition:
      'Financial instrument which may be used to reimburse or pay for health care products and services. Includes both insurance and self-payment.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Coverage',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Copertura',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Couverture',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Cobertura',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ä¿�é™©è´£ä»»',
      },
    ],
  },
  {
    code: 'CoverageEligibilityRequest',
    display: 'CoverageEligibilityRequest',
    definition:
      'The CoverageEligibilityRequest provides patient and insurance coverage information to an insurer for them to respond, in the form of an CoverageEligibilityResponse, with information regarding whether the stated coverage is valid and in-force and optionally to provide the insurance details of the policy.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'CoverageEligibilityRequest',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RichiestaEleggibilitaCopertura',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'CouvertureDemandeEligibilitÃ©',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'èµ„æ ¼è¯·æ±‚',
      },
    ],
  },
  {
    code: 'CoverageEligibilityResponse',
    display: 'CoverageEligibilityResponse',
    definition:
      'This resource provides eligibility and plan details from the processing of an CoverageEligibilityRequest resource.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'CoverageEligibilityResponse',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RispostaEleggibilitaCopertura',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RÃ©ponseEligibilitÃ©Couverture',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'èµ„æ ¼å“�åº”',
      },
    ],
  },
  {
    code: 'DetectedIssue',
    display: 'DetectedIssue',
    definition:
      'Indicates an actual or potential clinical issue with or between one or more active or proposed clinical actions for a patient; e.g. Drug-drug interaction, Ineffective treatment frequency, Procedure-condition conflict, etc.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DetectedIssue',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ProblemaRilevato',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ProblÃ¨me DÃ©tectÃ©',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Problema-Detectado /ProblemaDetectado',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'å·²å�‘çŽ°é—®é¢˜',
      },
    ],
  },
  {
    code: 'Device',
    display: 'Device',
    definition:
      'A type of a manufactured item that is used in the provision of healthcare without being substantially changed through that activity. The device may be a medical or non-medical device.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Device',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Dispositivo',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Dispositif',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Dispositivo',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è£…ç½®',
      },
    ],
  },
  {
    code: 'DeviceDefinition',
    display: 'DeviceDefinition',
    definition:
      'The characteristics, operational status and capabilities of a medical-related component of a medical device.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DeviceDefinition',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DÃ©finitionDeDispositif',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefiniciÃ³nDeDispositivo',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è£…ç½®ç»„ä»¶',
      },
    ],
  },
  {
    code: 'DeviceMetric',
    display: 'DeviceMetric',
    definition:
      'Describes a measurement, calculation or setting capability of a medical device.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DeviceMetric',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MÃ©triqueDispositif',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MetricaDeDispositivo',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è£…ç½®æŒ‡æ ‡',
      },
    ],
  },
  {
    code: 'DeviceRequest',
    display: 'DeviceRequest',
    definition:
      'Represents a request for a patient to employ a medical device. The device may be an implantable device, or an external assistive device, such as a walker.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DeviceRequest',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RichiestaDispositivo',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DemandeUtilisationDispositif',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SolicitudDeDispositivo',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è£…ç½®è¯·æ±‚',
      },
    ],
  },
  {
    code: 'DeviceUseStatement',
    display: 'DeviceUseStatement',
    definition:
      'A record of a device being used by a patient where the record is the result of a report from the patient or another clinician.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DeviceUseStatement',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è£…ç½®ä½¿ç”¨å£°æ˜Ž',
      },
    ],
  },
  {
    code: 'DiagnosticReport',
    display: 'DiagnosticReport',
    definition:
      'The findings and interpretation of diagnostic  tests performed on patients, groups of patients, devices, and locations, and/or specimens derived from these. The report includes clinical context such as requesting and provider information, and some mix of atomic results, images, textual and coded interpretations, and formatted representation of diagnostic reports.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DiagnosticReport',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RefertoDiagnostico',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RapportDiagnostique',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è¯Šæ–­æŠ¥å‘Š',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'InformeDiagnostico',
      },
    ],
  },
  {
    code: 'DocumentManifest',
    display: 'DocumentManifest',
    definition:
      'A collection of documents compiled for a purpose together with metadata that applies to the collection.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DocumentManifest',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Manifeste',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ–‡æ¡£æ¸…å�•',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ManifestoDocumento',
      },
    ],
  },
  {
    code: 'DocumentReference',
    display: 'DocumentReference',
    definition:
      'A reference to a document of any kind for any purpose. Provides metadata about the document so that the document can be discovered and managed. The scope of a document is any seralized object with a mime-type, so includes formal patient centric documents (CDA), cliical notes, scanned paper, and non-patient specific documents like policy text.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DocumentReference',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RiferimentoDocumento',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RÃ©fÃ©renceDocument',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ReferenciaDocumento',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ–‡æ¡£å¼•ç”¨',
      },
    ],
  },
  {
    code: 'DomainResource',
    display: 'DomainResource',
    definition:
      'A resource that includes narrative, extensions, and contained resources.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DomainResource',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RecursoDeDominio',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'é¢†åŸŸèµ„æº�',
      },
    ],
  },
  {
    code: 'EffectEvidenceSynthesis',
    display: 'EffectEvidenceSynthesis',
    definition:
      'The EffectEvidenceSynthesis resource describes the difference in an outcome between exposures states in a population where the effect estimate is derived from a combination of research studies.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EffectEvidenceSynthesis',
      },
    ],
  },
  {
    code: 'Encounter',
    display: 'Encounter',
    definition:
      'An interaction between a patient and healthcare provider(s) for the purpose of providing healthcare service(s) or assessing the health status of a patient.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Encounter',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Venue',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'å°±åŒ»è¿‡ç¨‹',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Encuentro',
      },
    ],
  },
  {
    code: 'Endpoint',
    display: 'Endpoint',
    definition:
      'The technical details of an endpoint that can be used for electronic services, such as for web services providing XDS.b or a REST endpoint for another FHIR server. This may include any security context information.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Endpoint',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Endpoint',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ç«¯ç‚¹',
      },
    ],
  },
  {
    code: 'EnrollmentRequest',
    display: 'EnrollmentRequest',
    definition:
      'This resource provides the insurance enrollment details to the insurer regarding a specified coverage.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EnrollmentRequest',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RichiestaIscrizione',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DemandeInscription',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SolicitudDeEnrolamiento',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ä¿�é™©æ³¨å†Œè¯·æ±‚',
      },
    ],
  },
  {
    code: 'EnrollmentResponse',
    display: 'EnrollmentResponse',
    definition:
      'This resource provides enrollment and plan details from the processing of an EnrollmentRequest resource.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EnrollmentResponse',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RispostaIscrizione',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RÃ©ponseInscription',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RespuestaDeEnrolamiento',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ä¿�é™©æ³¨å†Œå“�åº”',
      },
    ],
  },
  {
    code: 'EpisodeOfCare',
    display: 'EpisodeOfCare',
    definition:
      'An association between a patient and an organization / healthcare provider(s) during which time encounters may occur. The managing organization assumes a level of responsibility for the patient during this time.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EpisodeOfCare',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EpisodioDiCura',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Ã‰pisodeDeSoins',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EpisodioDeCuidado',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ç…§æŠ¤æœ�åŠ¡èŠ‚æ®µ',
      },
    ],
  },
  {
    code: 'EventDefinition',
    display: 'EventDefinition',
    definition:
      'The EventDefinition resource provides a reusable description of when a particular event can occur.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EventDefinition',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefinizioneEvento',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefinitionDeEvento',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'äº‹ä»¶å®šä¹‰',
      },
    ],
  },
  {
    code: 'Evidence',
    display: 'Evidence',
    definition:
      'The Evidence resource describes the conditional state (population and any exposures being compared within the population) and outcome (if specified) that the knowledge (evidence, assertion, recommendation) is about.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Evidence',
      },
    ],
  },
  {
    code: 'EvidenceVariable',
    display: 'EvidenceVariable',
    definition:
      'The EvidenceVariable resource describes a "PICO" element that knowledge (evidence, assertion, recommendation) is about.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EvidenceVariable',
      },
    ],
  },
  {
    code: 'ExampleScenario',
    display: 'ExampleScenario',
    definition: 'Example of workflow instance.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ExampleScenario',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ScenarioDiEsempio',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EjemploDeEscenario',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ç¤ºä¾‹åœºæ™¯',
      },
    ],
  },
  {
    code: 'ExplanationOfBenefit',
    display: 'ExplanationOfBenefit',
    definition:
      'This resource provides: the claim details; adjudication details from the processing of a Claim; and optionally account balance information, for informing the subscriber of the benefits provided.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ExplanationOfBenefit',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ExplicationDuBÃ©nÃ©fice',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'èµ”ä»˜è¯´æ˜Ž',
      },
    ],
  },
  {
    code: 'FamilyMemberHistory',
    display: 'FamilyMemberHistory',
    definition:
      'Significant health conditions for a person related to the patient relevant in the context of care for the patient.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'FamilyMemberHistory',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'HistoireMembreFamille',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'HistorialMiembroFamiliar',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'å®¶æ—�å�²',
      },
    ],
  },
  {
    code: 'Flag',
    display: 'Flag',
    definition:
      'Prospective warnings of potential issues when providing care to the patient.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Flag',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Drapeau',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Bandera',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ ‡è®°',
      },
    ],
  },
  {
    code: 'Goal',
    display: 'Goal',
    definition:
      'Describes the intended objective(s) for a patient, group or organization care, for example, weight loss, restoring an activity of daily living, obtaining herd immunity via immunization, meeting a process improvement objective, etc.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Goal',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'But',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Objetivo',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ç›®æ ‡',
      },
    ],
  },
  {
    code: 'GraphDefinition',
    display: 'GraphDefinition',
    definition:
      'A formal computable definition of a graph of resources - that is, a coherent set of resources that form a graph by following references. The Graph Definition resource defines a set and makes rules about the set.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'GraphDefinition',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefinitionGrafico',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'å›¾å½¢å®šä¹‰',
      },
    ],
  },
  {
    code: 'Group',
    display: 'Group',
    definition:
      "Represents a defined collection of entities that may be discussed or acted upon collectively but which are not expected to act collectively, and are not formally or legally recognized; i.e. a collection of entities that isn't an Organization.",
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Group',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Gruppo',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Groupe',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Grupo',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ç¾¤ç»„',
      },
    ],
  },
  {
    code: 'GuidanceResponse',
    display: 'GuidanceResponse',
    definition:
      'A guidance response is the formal response to a guidance request, including any output parameters returned by the evaluation, as well as the description of any proposed actions to be taken.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'GuidanceResponse',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RespuestaDeOrientacion',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æŒ‡å¯¼æ„�è§�å“�åº”',
      },
    ],
  },
  {
    code: 'HealthcareService',
    display: 'HealthcareService',
    definition: 'The details of a healthcare service available at a location.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'HealthcareService',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ServizioSanitario',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ServiceDeSantÃ©',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ServicioDeCuidado',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'åŒ»ç–—ä¿�å�¥æœ�åŠ¡é¡¹ç›®',
      },
    ],
  },
  {
    code: 'ImagingStudy',
    display: 'ImagingStudy',
    definition:
      'Representation of the content produced in a DICOM imaging study. A study comprises a set of series, each of which includes a set of Service-Object Pair Instances (SOP Instances - images or other data) acquired or produced in a common context.  A series is of only one modality (e.g. X-ray, CT, MR, ultrasound), but a study may have multiple series of different modalities.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ImagingStudy',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EtudeImagerie',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EstudioImagen  / EstudioImagen',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æˆ�åƒ�æ£€æŸ¥',
      },
    ],
  },
  {
    code: 'Immunization',
    display: 'Immunization',
    definition:
      'Describes the event of a patient being administered a vaccine or a record of an immunization as reported by a patient, a clinician or another party.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Immunization',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Immunizzazione',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Immunisation',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'å…�ç–«æŽ¥ç§�',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'InmunizaciÃ³n',
      },
    ],
  },
  {
    code: 'ImmunizationEvaluation',
    display: 'ImmunizationEvaluation',
    definition:
      'Describes a comparison of an immunization event against published recommendations to determine if the administration is "valid" in relation to those  recommendations.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ImmunizationEvaluation',
      },
    ],
  },
  {
    code: 'ImmunizationRecommendation',
    display: 'ImmunizationRecommendation',
    definition:
      "A patient's point-in-time set of recommendations (i.e. forecasting) according to a published schedule with optional supporting justification.",
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ImmunizationRecommendation',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RecommendationImmunisation',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'å…�ç–«æŽ¥ç§�å»ºè®®',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RecomendaciÃ³nInmunizaciÃ³n /',
      },
    ],
  },
  {
    code: 'ImplementationGuide',
    display: 'ImplementationGuide',
    definition:
      'A set of rules of how a particular interoperability or standards problem is solved - typically through the use of FHIR resources. This resource is used to gather all the parts of an implementation guide into a logical whole and to publish a computable definition of all the parts.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ImplementationGuide',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'GuiaDeImplementacion',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'å®žæ–½æŒ‡å�—',
      },
    ],
  },
  {
    code: 'InsurancePlan',
    display: 'InsurancePlan',
    definition:
      'Details of a Health Insurance product/plan provided by an organization.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'InsurancePlan',
      },
    ],
  },
  {
    code: 'Invoice',
    display: 'Invoice',
    definition:
      'Invoice containing collected ChargeItems from an Account with calculated individual and total price for Billing purpose.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Invoice',
      },
    ],
  },
  {
    code: 'Library',
    display: 'Library',
    definition:
      'The Library resource is a general-purpose container for knowledge asset definitions. It can be used to describe and expose existing knowledge assets such as logic libraries and information model descriptions, as well as to describe a collection of knowledge assets.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Library',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'LibrerÃ­a',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'åº“',
      },
    ],
  },
  {
    code: 'Linkage',
    display: 'Linkage',
    definition:
      'Identifies two or more records (resource instances) that refer to the same real-world "occurrence".',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Linkage',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Enlace / ConexiÃ³n / Vinculo / Acoplamiento ',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'é“¾æŽ¥å…³ç³»',
      },
    ],
  },
  {
    code: 'List',
    display: 'List',
    definition: 'A list is a curated collection of resources.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'List',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Lista',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Liste',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'åˆ—è¡¨',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Lista',
      },
    ],
  },
  {
    code: 'Location',
    display: 'Location',
    definition:
      'Details and position information for a physical place where services are provided and resources and participants may be stored, found, contained, or accommodated.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Location',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Localisation',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ä½�ç½®',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Locacion',
      },
    ],
  },
  {
    code: 'Measure',
    display: 'Measure',
    definition:
      'The Measure resource provides the definition of a quality measure.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Measure',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Misura',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Medida',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æŒ‡æ ‡',
      },
    ],
  },
  {
    code: 'MeasureReport',
    display: 'MeasureReport',
    definition:
      'The MeasureReport resource contains the results of the calculation of a measure; and optionally a reference to the resources involved in that calculation.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MeasureReport',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ReporteMedida',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æŒ‡æ ‡æŠ¥å‘Š',
      },
    ],
  },
  {
    code: 'Media',
    display: 'Media',
    definition:
      'A photo, video, or audio recording acquired or used in healthcare. The actual content may be inline or provided by direct reference.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Media',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Media',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MÃ©dia',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Medio',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'åª’ä½“',
      },
    ],
  },
  {
    code: 'Medication',
    display: 'Medication',
    definition:
      'This resource is primarily used for the identification and definition of a medication for the purposes of prescribing, dispensing, and administering a medication as well as for making statements about medication use.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Medication',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MÃ©dication',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è�¯ç‰©',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MedicaciÃ³n /Medicamento',
      },
    ],
  },
  {
    code: 'MedicationAdministration',
    display: 'MedicationAdministration',
    definition:
      'Describes the event of a patient consuming or otherwise being administered a medication.  This may be as simple as swallowing a tablet or it may be a long running infusion.  Related resources tie this event to the authorizing prescription, and the specific encounter between patient and health care practitioner.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MedicationAdministration',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'AdministrationMÃ©dicaments',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è�¯ç‰©æ–½ç”¨',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'AdministraciÃ³nMedicaciÃ³n / AdministracionMedicamento',
      },
    ],
  },
  {
    code: 'MedicationDispense',
    display: 'MedicationDispense',
    definition:
      'Indicates that a medication product is to be or has been dispensed for a named person/patient.  This includes a description of the medication product (supply) provided and the instructions for administering the medication.  The medication dispense is the result of a pharmacy system responding to a medication order.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MedicationDispense',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DispensationMÃ©dicaments',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è�¯ç‰©é…�å�‘',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DispensaciÃ³nMedicaciÃ³n /DispensacionMedicamento',
      },
    ],
  },
  {
    code: 'MedicationKnowledge',
    display: 'MedicationKnowledge',
    definition:
      'Information about a medication that is used to support knowledge.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MedicationKnowledge',
      },
    ],
  },
  {
    code: 'MedicationRequest',
    display: 'MedicationRequest',
    definition:
      'An order or request for both supply of the medication and the instructions for administration of the medication to a patient. The resource is called "MedicationRequest" rather than "MedicationPrescription" or "MedicationOrder" to generalize the use across inpatient and outpatient settings, including care plans, etc., and to harmonize with workflow patterns.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MedicationRequest',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'PrescriptionMÃ©dicamenteuseTODO',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è�¯ç‰©è¯·æ±‚',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'PrescripciÃ³nMedicaciÃ³nTODO  /PrescripcionMedicamento',
      },
    ],
  },
  {
    code: 'MedicationStatement',
    display: 'MedicationStatement',
    definition:
      "A record of a medication that is being consumed by a patient.   A MedicationStatement may indicate that the patient may be taking the medication now or has taken the medication in the past or will be taking the medication in the future.  The source of this information can be the patient, significant other (such as a family member or spouse), or a clinician.  A common scenario where this information is captured is during the history taking process during a patient visit or stay.   The medication information may come from sources such as the patient's memory, from a prescription bottle,  or from a list of medications the patient, clinician or other party maintains. \n\nThe primary difference between a medication statement and a medication administration is that the medication administration has complete administration information and is based on actual administration information from the person who administered the medication.  A medication statement is often, if not always, less specific.  There is no required date/time when the medication was administered, in fact we only know that a source has reported the patient is taking this medication, where details such as time, quantity, or rate or even medication product may be incomplete or missing or less precise.  As stated earlier, the medication statement information may come from the patient's memory, from a prescription bottle or from a list of medications the patient, clinician or other party maintains.  Medication administration is more formal and is not missing detailed information.",
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MedicationStatement',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Ã‰tatMÃ©dication',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è�¯ç‰©å£°æ˜Ž',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ResumenMedicaciÃ³n /ResumenMedicamento',
      },
    ],
  },
  {
    code: 'MedicinalProduct',
    display: 'MedicinalProduct',
    definition:
      'Detailed definition of a medicinal product, typically for uses other than direct patient care (e.g. regulatory use).',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MedicinalProduct',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ProdottoMedicinale',
      },
    ],
  },
  {
    code: 'MedicinalProductAuthorization',
    display: 'MedicinalProductAuthorization',
    definition: 'The regulatory authorization of a medicinal product.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MedicinalProductAuthorization',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'AutorizzazioneProdottoMedicinale',
      },
    ],
  },
  {
    code: 'MedicinalProductContraindication',
    display: 'MedicinalProductContraindication',
    definition:
      'The clinical particulars - indications, contraindications etc. of a medicinal product, including for regulatory purposes.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MedicinalProductContraindication',
      },
    ],
  },
  {
    code: 'MedicinalProductIndication',
    display: 'MedicinalProductIndication',
    definition: 'Indication for the Medicinal Product.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MedicinalProductInteraction',
      },
    ],
  },
  {
    code: 'MedicinalProductIngredient',
    display: 'MedicinalProductIngredient',
    definition:
      'An ingredient of a manufactured item or pharmaceutical product.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MedicinalProductIngredient',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'IngredienteProdottoMedicinale',
      },
    ],
  },
  {
    code: 'MedicinalProductInteraction',
    display: 'MedicinalProductInteraction',
    definition:
      'The interactions of the medicinal product with other medicinal products, or other forms of interactions.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MedicinalProductInteraction',
      },
    ],
  },
  {
    code: 'MedicinalProductManufactured',
    display: 'MedicinalProductManufactured',
    definition:
      'The manufactured item as contained in the packaged medicinal product.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MedicinalProductManufactured',
      },
    ],
  },
  {
    code: 'MedicinalProductPackaged',
    display: 'MedicinalProductPackaged',
    definition: 'A medicinal product in a container or package.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MedicinalProductPackaged',
      },
    ],
  },
  {
    code: 'MedicinalProductPharmaceutical',
    display: 'MedicinalProductPharmaceutical',
    definition:
      'A pharmaceutical product described in terms of its composition and dose form.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MedicinalProductPharmaceutical',
      },
    ],
  },
  {
    code: 'MedicinalProductUndesirableEffect',
    display: 'MedicinalProductUndesirableEffect',
    definition: 'Describe the undesirable effects of the medicinal product.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MedicinalProductUndesirableEffect',
      },
    ],
  },
  {
    code: 'MessageDefinition',
    display: 'MessageDefinition',
    definition:
      'Defines the characteristics of a message that can be shared between systems, including the type of event that initiates the message, the content to be transmitted and what response(s), if any, are permitted.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MessageDefinition',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefinizioneMessaggio',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefinicionMensaje',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ¶ˆæ�¯å®šä¹‰',
      },
    ],
  },
  {
    code: 'MessageHeader',
    display: 'MessageHeader',
    definition:
      'The header for a message exchange that is either requesting or responding to an action.  The reference(s) that are the subject of the action as well as other information related to the action are typically transmitted in a bundle in which the MessageHeader resource instance is the first resource in the bundle.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MessageHeader',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EntÃªteMessage',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ¶ˆæ�¯æ ‡å¤´',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'CabeceraMensaje',
      },
    ],
  },
  {
    code: 'MolecularSequence',
    display: 'MolecularSequence',
    definition: 'Raw data describing a biological sequence.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MolecularSequence',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SecuenciaMolecular',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'åˆ†å­�åº�åˆ—',
      },
    ],
  },
  {
    code: 'NamingSystem',
    display: 'NamingSystem',
    definition:
      'A curated namespace that issues unique symbols within that namespace for the identification of concepts, people, devices, etc.  Represents a "System" used within the Identifier and Coding data types.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'NamingSystem',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SystÃ¨meDeNommage',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SistemaDeNombres',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'å‘½å��ç³»ç»Ÿ',
      },
    ],
  },
  {
    code: 'NutritionOrder',
    display: 'NutritionOrder',
    definition:
      'A request to supply a diet, formula feeding (enteral) or oral nutritional supplement to a patient/resident.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'NutritionOrder',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'OrdreNutrition',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'OrdenNutriciÃ³n',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è�¥å…»åŒ»å˜±',
      },
    ],
  },
  {
    code: 'Observation',
    display: 'Observation',
    definition:
      'Measurements and simple assertions made about a patient, device or other subject.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Observation',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Osservazione',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Observation',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è§‚å¯Ÿ',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ObservaciÃ³n',
      },
    ],
  },
  {
    code: 'ObservationDefinition',
    display: 'ObservationDefinition',
    definition:
      'Set of definitional characteristics for a kind of observation or measurement produced or consumed by an orderable health care service.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ObservationDefinition',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefinizioneOsservazione',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefinicionDeEspecimen',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è§‚å¯Ÿå®šä¹‰',
      },
    ],
  },
  {
    code: 'OperationDefinition',
    display: 'OperationDefinition',
    definition:
      'A formal computable definition of an operation (on the RESTful interface) or a named query (using the search interaction).',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'OperationDefinition',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefinizioneOperazione',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DÃ©finitionOpÃ©ration',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefinicionDeOperacion',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ“�ä½œå®šä¹‰',
      },
    ],
  },
  {
    code: 'OperationOutcome',
    display: 'OperationOutcome',
    definition:
      'A collection of error, warning, or information messages that result from a system action.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'OperationOutcome',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RisultatoOperazione',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RÃ©sultatOpÃ©ration',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ“�ä½œç»“å±€',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ResultadoOperaciÃ³n',
      },
    ],
  },
  {
    code: 'Organization',
    display: 'Organization',
    definition:
      'A formally or informally recognized grouping of people or organizations formed for the purpose of achieving some form of collective action.  Includes companies, institutions, corporations, departments, community groups, healthcare practice groups, payer/insurer, etc.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Organization',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Organizzazione',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Organisation',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ç»„ç»‡æœºæž„',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'OrganizaciÃ³n',
      },
    ],
  },
  {
    code: 'OrganizationAffiliation',
    display: 'OrganizationAffiliation',
    definition:
      'Defines an affiliation/assotiation/relationship between 2 distinct oganizations, that is not a part-of relationship/sub-division relationship.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'OrganizationAffiliation',
      },
    ],
  },
  {
    code: 'Parameters',
    display: 'Parameters',
    definition:
      'This resource is a non-persisted resource used to pass information into and back from an [operation](operations.html). It has no other use, and there is no RESTful endpoint associated with it.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Parameters',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Parametros',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'å�‚æ•°',
      },
    ],
  },
  {
    code: 'Patient',
    display: 'Patient',
    definition:
      'Demographics and other administrative information about an individual or animal receiving care or other health-related services.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Patient',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Paziente',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Patient',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ‚£è€…',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Paciente',
      },
    ],
  },
  {
    code: 'PaymentNotice',
    display: 'PaymentNotice',
    definition:
      'This resource provides the status of the payment for goods and services rendered, and the request and response resource references.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'PaymentNotice',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'AvvisoDiPagamento',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'AvisPaiement',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'AvisoDePago',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ä»˜æ¬¾é€šçŸ¥',
      },
    ],
  },
  {
    code: 'PaymentReconciliation',
    display: 'PaymentReconciliation',
    definition:
      'This resource provides the details including amount of a payment and allocates the payment items being paid.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'PaymentReconciliation',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RiconciliazionePagamento',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RÃ©conciliationPaiement',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ConciliacionDePago',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ä»˜æ¬¾å¯¹è´¦',
      },
    ],
  },
  {
    code: 'Person',
    display: 'Person',
    definition:
      'Demographics and administrative information about a person independent of a specific health-related context.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Person',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Persona',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Personne',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Persona',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'äººå‘˜',
      },
    ],
  },
  {
    code: 'PlanDefinition',
    display: 'PlanDefinition',
    definition:
      'This resource allows for the definition of various types of plans as a sharable, consumable, and executable artifact. The resource is general enough to support the description of a broad range of clinical artifacts such as clinical decision support rules, order sets and protocols.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'PlanDefinition',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefinicionDePlan',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è®¡åˆ’å®šä¹‰',
      },
    ],
  },
  {
    code: 'Practitioner',
    display: 'Practitioner',
    definition:
      'A person who is directly or indirectly involved in the provisioning of healthcare.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Practitioner',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Praticien',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ‰§ä¸šäººå‘˜',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Practicante / Profesional',
      },
    ],
  },
  {
    code: 'PractitionerRole',
    display: 'PractitionerRole',
    definition:
      'A specific set of Roles/Locations/specialties/services that a practitioner may perform at an organization for a period of time.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'PractitionerRole',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RolProfesional',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ‰§ä¸šäººå‘˜è§’è‰²',
      },
    ],
  },
  {
    code: 'Procedure',
    display: 'Procedure',
    definition:
      'An action that is or was performed on or for a patient. This can be a physical intervention like an operation, or less invasive like long term services, counseling, or hypnotherapy.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Procedure',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Procedura',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ProcÃ©dure',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ“�ä½œé¡¹ç›®',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Procedimiento',
      },
    ],
  },
  {
    code: 'Provenance',
    display: 'Provenance',
    definition:
      'Provenance of a resource is a record that describes entities and processes involved in producing and delivering or otherwise influencing that resource. Provenance provides a critical foundation for assessing authenticity, enabling trust, and allowing reproducibility. Provenance assertions are a form of contextual metadata and can themselves become important records with their own provenance. Provenance statement indicates clinical significance in terms of confidence in authenticity, reliability, and trustworthiness, integrity, and stage in lifecycle (e.g. Document Completion - has the artifact been legally authenticated), all of which may impact security, privacy, and trust policies.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Provenance',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Provenienza',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Provenance',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'å‡ºå¤„',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Procedencia',
      },
    ],
  },
  {
    code: 'Questionnaire',
    display: 'Questionnaire',
    definition:
      'A structured set of questions intended to guide the collection of answers from end-users. Questionnaires provide detailed control over order, presentation, phraseology and grouping to allow coherent, consistent data collection.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Questionnaire',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Questionario',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Questionnaire',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è°ƒæŸ¥é—®å�·',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Cuestionario',
      },
    ],
  },
  {
    code: 'QuestionnaireResponse',
    display: 'QuestionnaireResponse',
    definition:
      'A structured set of questions and their answers. The questions are ordered and grouped into coherent subsets, corresponding to the structure of the grouping of the questionnaire being responded to.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'QuestionnaireResponse',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RispostaQuestionario',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RÃ©ponseQuestionnaire',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RespuestaAlCuestionario',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è°ƒæŸ¥é—®å�·ç­”å¤�',
      },
    ],
  },
  {
    code: 'RelatedPerson',
    display: 'RelatedPerson',
    definition:
      'Information about a person that is involved in the care for a patient, but who is not the target of healthcare, nor has a formal responsibility in the care process.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RelatedPerson',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'PersonaCorrelata',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'PersonneEnRelation',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'PersonaRelacionada',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ç›¸å…³äººå‘˜',
      },
    ],
  },
  {
    code: 'RequestGroup',
    display: 'RequestGroup',
    definition:
      'A group of related requests that can be used to capture intended activities that have inter-dependencies such as "give this medication after that one".',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RequestGroup',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'GruppoDiRichieste',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'GrupoDeSolicitudes',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è¯·æ±‚åˆ†ç»„',
      },
    ],
  },
  {
    code: 'ResearchDefinition',
    display: 'ResearchDefinition',
    definition:
      'The ResearchDefinition resource describes the conditional state (population and any exposures being compared within the population) and outcome (if specified) that the knowledge (evidence, assertion, recommendation) is about.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ResearchDefinition',
      },
    ],
  },
  {
    code: 'ResearchElementDefinition',
    display: 'ResearchElementDefinition',
    definition:
      'The ResearchElementDefinition resource describes a "PICO" element that knowledge (evidence, assertion, recommendation) is about.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ResearchElementDefinition',
      },
    ],
  },
  {
    code: 'ResearchStudy',
    display: 'ResearchStudy',
    definition:
      'A process where a researcher or organization plans and then executes a series of steps intended to increase the field of healthcare-related knowledge.  This includes studies of safety, efficacy, comparative effectiveness and other information about medications, devices, therapies and other interventional and investigative techniques.  A ResearchStudy involves the gathering of information about human or animal subjects.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ResearchStudy',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EstudioDeInvestigacion',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è°ƒæŸ¥ç ”ç©¶',
      },
    ],
  },
  {
    code: 'ResearchSubject',
    display: 'ResearchSubject',
    definition:
      'A physical entity which is the primary unit of operational and/or administrative interest in a study.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ResearchSubject',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SujetoDeInvestigacion',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ç ”ç©¶ä¸»é¢˜',
      },
    ],
  },
  {
    code: 'Resource',
    display: 'Resource',
    definition: 'This is the base resource type for everything.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Resource',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Recurso',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'èµ„æº�',
      },
    ],
  },
  {
    code: 'RiskAssessment',
    display: 'RiskAssessment',
    definition:
      'An assessment of the likely outcome(s) for a patient or other subject as well as the likelihood of each outcome.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RiskAssessment',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Ã‰valuationRisques',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EvaluacionDeRiesgo',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'é£Žé™©è¯„ä¼°',
      },
    ],
  },
  {
    code: 'RiskEvidenceSynthesis',
    display: 'RiskEvidenceSynthesis',
    definition:
      'The RiskEvidenceSynthesis resource describes the likelihood of an outcome in a population plus exposure state where the risk estimate is derived from a combination of research studies.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RiskEvidenceSynthesis',
      },
    ],
  },
  {
    code: 'Schedule',
    display: 'Schedule',
    definition:
      'A container for slots of time that may be available for booking appointments.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Schedule',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Agenda',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ—¥ç¨‹å®‰æŽ’',
      },
    ],
  },
  {
    code: 'SearchParameter',
    display: 'SearchParameter',
    definition:
      'A search parameter that defines a named search item that can be used to search/filter on a resource.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SearchParameter',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ParametroDiRicerca',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ParamÃ¨treRecherche',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ParametroDeBusqueda',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ�œç´¢å�‚æ•°',
      },
    ],
  },
  {
    code: 'ServiceRequest',
    display: 'ServiceRequest',
    definition:
      'A record of a request for service such as diagnostic investigations, treatments, or operations to be performed.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ServiceRequest',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RichiestaDiServizio',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DemandeService',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'PeticiÃ³nServicio',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æœ�åŠ¡é¡¹ç›®è¯·æ±‚',
      },
    ],
  },
  {
    code: 'Slot',
    display: 'Slot',
    definition:
      'A slot of time on a schedule that may be available for booking appointments.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Slot',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Slot',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ§½ä½�',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Hueco / Zocalo / Espacio',
      },
    ],
  },
  {
    code: 'Specimen',
    display: 'Specimen',
    definition: 'A sample to be used for analysis.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Specimen',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Campione',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SpÃ©cimen',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ ‡æœ¬',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Especimen',
      },
    ],
  },
  {
    code: 'SpecimenDefinition',
    display: 'SpecimenDefinition',
    definition: 'A kind of specimen with associated set of requirements.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SpecimenDefinition',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefinizioneCampione',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefinicionDeEspecimen',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æ ‡æœ¬å®šä¹‰',
      },
    ],
  },
  {
    code: 'StructureDefinition',
    display: 'StructureDefinition',
    definition:
      'A definition of a FHIR structure. This resource is used to describe the underlying resources, data types defined in FHIR, and also for describing extensions and constraints on resources and data types.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'StructureDefinition',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefinizioneStruttura',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DÃ©finitionStructure',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'DefinicionDeEstructura',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ç»“æž„å®šä¹‰',
      },
    ],
  },
  {
    code: 'StructureMap',
    display: 'StructureMap',
    definition:
      'A Map of relationships between 2 structures that can be used to transform data.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'StructureMap',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'MapaDeEstructura',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ç»“æž„æ˜ å°„',
      },
    ],
  },
  {
    code: 'Subscription',
    display: 'Subscription',
    definition:
      'The subscription resource is used to define a push-based subscription from a server to another system. Once a subscription is registered with the server, the server checks every resource that is created or updated, and if the resource matches the given criteria, it sends a message on the defined "channel" so that another system can take an appropriate action.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Subscription',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Sottoscrizione',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Souscription',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è®¢é˜…',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SuscripciÃ³n',
      },
    ],
  },
  {
    code: 'Substance',
    display: 'Substance',
    definition: 'A homogeneous material with a definite composition.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Substance',
      },
      {
        language: 'it',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Sostanza',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Substance',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ç‰©è´¨',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Sustancia',
      },
    ],
  },
  {
    code: 'SubstanceNucleicAcid',
    display: 'SubstanceNucleicAcid',
    definition:
      'Nucleic acids are defined by three distinct elements: the base, sugar and linkage. Individual substance/moiety IDs will be created for each of these elements. The nucleotide sequence will be always entered in the 5â€™-3â€™ direction.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SubstanceNucleicAcid',
      },
    ],
  },
  {
    code: 'SubstancePolymer',
    display: 'SubstancePolymer',
    definition: 'Todo.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SubstancePolymer',
      },
    ],
  },
  {
    code: 'SubstanceProtein',
    display: 'SubstanceProtein',
    definition:
      'A SubstanceProtein is defined as a single unit of a linear amino acid sequence, or a combination of subunits that are either covalently linked or have a defined invariant stoichiometric relationship. This includes all synthetic, recombinant and purified SubstanceProteins of defined sequence, whether the use is therapeutic or prophylactic. This set of elements will be used to describe albumins, coagulation factors, cytokines, growth factors, peptide/SubstanceProtein hormones, enzymes, toxins, toxoids, recombinant vaccines, and immunomodulators.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SubstanceProtein',
      },
    ],
  },
  {
    code: 'SubstanceReferenceInformation',
    display: 'SubstanceReferenceInformation',
    definition: 'Todo.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SubstanceReferenceInformation',
      },
    ],
  },
  {
    code: 'SubstanceSourceMaterial',
    display: 'SubstanceSourceMaterial',
    definition:
      'Source material shall capture information on the taxonomic and anatomical origins as well as the fraction of a material that can result in or can be modified to form a substance. This set of data elements shall be used to define polymer substances isolated from biological matrices. Taxonomic and anatomical origins shall be described using a controlled vocabulary as required. This information is captured for naturally derived polymers ( . starch) and structurally diverse substances. For Organisms belonging to the Kingdom Plantae the Substance level defines the fresh material of a single species or infraspecies, the Herbal Drug and the Herbal preparation. For Herbal preparations, the fraction information will be captured at the Substance information level and additional information for herbal extracts will be captured at the Specified Substance Group 1 information level. See for further explanation the Substance Class: Structurally Diverse and the herbal annex.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SubstanceSourceMaterial',
      },
    ],
  },
  {
    code: 'SubstanceSpecification',
    display: 'SubstanceSpecification',
    definition:
      'The detailed description of a substance, typically at a level beyond what is used for prescribing.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SubstanceSpecification',
      },
    ],
  },
  {
    code: 'SupplyDelivery',
    display: 'SupplyDelivery',
    definition: 'Record of delivery of what is supplied.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SupplyDelivery',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Supply Livraison',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ä¾›åº”äº¤ä»˜',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Entrega de Suministro',
      },
    ],
  },
  {
    code: 'SupplyRequest',
    display: 'SupplyRequest',
    definition:
      'A record of a request for a medication, substance or device used in the healthcare setting.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'SupplyRequest',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: "Demande d'approvisionnement",
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ä¾›åº”è¯·æ±‚',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Solicitud de Suministro',
      },
    ],
  },
  {
    code: 'Task',
    display: 'Task',
    definition: 'A task to be performed.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Task',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'Tarea',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ä»»åŠ¡',
      },
    ],
  },
  {
    code: 'TerminologyCapabilities',
    display: 'TerminologyCapabilities',
    definition:
      'A TerminologyCapabilities resource documents a set of capabilities (behaviors) of a FHIR Terminology Server that may be used as a statement of actual server functionality or a statement of required or desired server implementation.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'TerminologyCapabilities',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'CapacidadTerminologica',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æœ¯è¯­æœ�åŠ¡èƒ½åŠ›',
      },
    ],
  },
  {
    code: 'TestReport',
    display: 'TestReport',
    definition:
      'A summary of information based on the results of executing a TestScript.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'TestReport',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'RapportTest',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ReporteDePrueba',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æµ‹è¯•æŠ¥å‘Š',
      },
    ],
  },
  {
    code: 'TestScript',
    display: 'TestScript',
    definition:
      'A structured set of tests against a FHIR server or client implementation to determine compliance against the FHIR specification.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'TestScript',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ScriptTest',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ScriptDePrueba',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'æµ‹è¯•è„šæœ¬',
      },
    ],
  },
  {
    code: 'ValueSet',
    display: 'ValueSet',
    definition:
      'A ValueSet resource instance specifies a set of codes drawn from one or more code systems, intended for use in a particular context. Value sets link between [[[CodeSystem]]] definitions and their use in [coded elements](terminologies.html).',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ValueSet',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'EnsembleValeurs',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'å�–å€¼é›†å�ˆ',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'ConjuntoValores / ConjuntoDeValores',
      },
    ],
  },
  {
    code: 'VerificationResult',
    display: 'VerificationResult',
    definition:
      'Describes validation requirements, source(s), status and dates for one or more elements.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'VerificationResult',
      },
    ],
  },
  {
    code: 'VisionPrescription',
    display: 'VisionPrescription',
    definition:
      'An authorization for the provision of glasses and/or contact lenses to a patient.',
    designation: [
      {
        language: 'en',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'VisionPrescription',
      },
      {
        language: 'fr',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'PrescriptionVision',
      },
      {
        language: 'es',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'PrescripcionDeVision',
      },
      {
        language: 'zh',
        use: {
          system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
          code: 'display',
        },
        value: 'è§†åŠ›å¤„æ–¹',
      },
    ],
  },
]

// http://hl7.org/fhir/valueset-request-status.html
const ValuesetRequestStatus = [
  {
    code: 'draft',
    display: 'Draft',
    definition:
      'The request has been created but is not yet complete or ready for action.',
  },
  {
    code: 'active',
    display: 'Active',
    definition: 'The request is in force and ready to be acted upon.',
  },
  {
    code: 'on-hold',
    display: 'On Hold',
    definition:
      'The request (and any implicit authorization to act) has been temporarily withdrawn but is expected to resume in the future.',
  },
  {
    code: 'revoked',
    display: 'Revoked',
    definition:
      'The request (and any implicit authorization to act) has been terminated prior to the known full completion of the intended actions.  No further activity should occur.',
  },
  {
    code: 'completed',
    display: 'Completed',
    definition:
      'The activity described by the request has been fully performed.  No further activity will occur.',
  },
  {
    code: 'entered-in-error',
    display: 'Entered in Error',
    definition:
      'This request should never have existed and should be considered \'void\'.  (It is possible that real-world decisions were based on it.  If real-world activity has occurred, the status should be "cancelled" rather than "entered-in-error".).',
  },
  {
    code: 'unknown',
    display: 'Unknown',
    definition:
      'The authoring/source system does not know which of the status values currently applies for this request.  Note: This concept is not to be used for "other" - one of the listed statuses is presumed to apply,  but the authoring/source system does not know which.',
  },
]

// http://hl7.org/fhir/valueset-request-intent.html
const ValuesetRequestIntent = [
  {
    code: 'proposal',
    display: 'Proposal',
    definition:
      'The request is a suggestion made by someone/something that does not have an intention to ensure it occurs and without providing an authorization to act.',
  },
  {
    code: 'plan',
    display: 'Plan',
    definition:
      'The request represents an intention to ensure something occurs without providing an authorization for others to act.',
  },
  {
    code: 'directive',
    display: 'Directive',
    definition:
      'The request represents a legally binding instruction authored by a Patient or RelatedPerson.',
  },
  {
    code: 'order',
    display: 'Order',
    definition:
      'The request represents a request/demand and authorization for action by a Practitioner.',
    concept: [
      {
        code: 'original-order',
        display: 'Original Order',
        definition:
          'The request represents an original authorization for action.',
      },
      {
        code: 'reflex-order',
        display: 'Reflex Order',
        definition:
          'The request represents an automatically generated supplemental authorization for action based on a parent authorization together with initial results of the action taken against that parent authorization.',
      },
      {
        code: 'filler-order',
        display: 'Filler Order',
        definition:
          "The request represents the view of an authorization instantiated by a fulfilling system representing the details of the fulfiller's intention to act upon a submitted order.",
        concept: [
          {
            code: 'instance-order',
            display: 'Instance Order',
            definition:
              'An order created in fulfillment of a broader order that represents the authorization for a single activity occurrence.  E.g. The administration of a single dose of a drug.',
          },
        ],
      },
    ],
  },
  {
    code: 'option',
    display: 'Option',
    definition:
      'The request represents a component or option for a RequestGroup that establishes timing, conditionality and/or other constraints among a set of requests.  Refer to [[[RequestGroup]]] for additional information on how this status is used.',
  },
]

// http://hl7.org/fhir/valueset-servicerequest-category.html
const ValuesetServicerequestCategory = [
  {
    code: '108252007',
    display: 'Laboratory procedure',
  },
  {
    code: '363679005',
    display: 'Imaging',
  },
  {
    code: '409063005',
    display: 'Counselling',
  },
  {
    code: '409073007',
    display: 'Education',
  },
  {
    code: '387713003',
    display: 'Surgical procedure',
  },
]

// http://hl7.org/fhir/valueset-request-priority.html
const ValuesetRequestPriority = [
  {
    code: 'routine',
    display: 'Routine',
    definition: 'The request has normal priority.',
  },
  {
    code: 'urgent',
    display: 'Urgent',
    definition:
      'The request should be actioned promptly - higher priority than routine.',
  },
  {
    code: 'asap',
    display: 'ASAP',
    definition:
      'The request should be actioned as soon as possible - higher priority than urgent.',
  },
  {
    code: 'stat',
    display: 'STAT',
    definition:
      'The request should be actioned immediately - highest possible priority.  E.g. an emergency.',
  },
]

module.exports = {
  NameUse,
  ValuesetIdentifierUse,
  ValuesetIdentifierType,
  AddressUse,
  AddressType,
  CountryList,
  StateList,
  DistrictList,
  ValuesetRelationship,
  ContactPointSystem,
  ContactPointUse,
  ContactPointRank,
  AdministrativeGender,
  ValuesetMaritalStatus,
  ValuesetLanguages,
  ValuesetQualificationCode,
  LocationCascaderOptions,
  ValuesetResourceTypes,
  ValuesetRequestStatus,
  ValuesetRequestIntent,
  ValuesetServicerequestCategory,
  ValuesetRequestPriority,
  LocationMongolia,
}

// const temp = [{
//   code: 'male',
//   display: 'Male',
//   definition: 'Male.',
//   "designation": [
//     {
//       language: 'en',
//       use: {
//         system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
//         code: 'display',
//       },
//       value: 'Male',
//     },
//     {
//       language: 'mn',
//       use: {
//         system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
//         code: 'display',
//       },
//       value: 'Эрэгтэй',
//     }
//   ],
// },
// {
//   code: 'female',
//   display: 'Female',
//   definition: 'Female.',
//   "designation": [
//     {
//       language: 'en',
//       use: {
//         system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
//         code: 'display',
//       },
//       value: 'Female',
//     },
//     {
//       language: 'mn',
//       use: {
//         system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
//         code: 'display',
//       },
//       value: 'Эмэгтэй',
//     }
//   ],
// },
// {
//   code: 'other',
//   display: 'Other',
//   definition: 'Other.',
//   "designation": [
//     {
//       language: 'en',
//       use: {
//         system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
//         code: 'display',
//       },
//       value: 'Other',
//     },
//     {
//       language: 'mn',
//       use: {
//         system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
//         code: 'display',
//       },
//       value: 'Бусад',
//     }
//   ],
// },
// {
//   code: 'unknown',
//   display: 'Unknown',
//   definition: 'Unknown.',
//   "designation": [
//     {
//       language: 'en',
//       use: {
//         system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
//         code: 'display',
//       },
//       value: 'Unknown',
//     },
//     {
//       language: 'mn',
//       use: {
//         system: 'http://terminology.hl7.org/CodeSystem/designation-usage',
//         code: 'display',
//       },
//       value: 'Тодорхойгүй',
//     }
//   ],
// },]
