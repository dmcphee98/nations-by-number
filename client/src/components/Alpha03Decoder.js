// Source: https://en.wikipedia.org/wiki/ISO_3166-1_alpha-3#:~:text=The%20following%20is%20a%20complete%20list%20of%20the,Maintenance%20Agency%20%28ISO%203166%2FMA%29%3A%20ABW%20Aruba%20AFG%20Afghanistan

/* Modifications made:
 * Bolivia (Plurinational State of) -> Bolivia
 * Brunei Darussalam -> Brunei
 * Congo, Democratic Republic of the -> DR Congo
 * Micronesia (Federated States of) -> Micronesia
 * United Kingdom of Great Britain and Northern Ireland -> United Kingdom
 * Iran (Islamic Republic of) -> Iran
 * Lao People's Democratic Republic -> Laos
 * Moldova, Republic of -> Moldova
 * Netherlands, Kingdom of the -> Netherlands
 * Korea, Republic of -> South Korea
 * Korea (Democratic People's Republic of) -> North Korea
 * Palestine, State of -> Palestine
 * Russian Federation -> Russia
 * Syrian Arab Republic -> Syria
 * Taiwan, Province of China -> Taiwan
 * Tanzania, United Republic of -> Tanzania
 * United States of America -> United States
 * Venezuela (Bolivarian Republic of) -> Venezuela
 * Viet Nam -> Vietnam
*/

const decodeAlpha03 = (code) => {
    switch (code) {
        case "ABW":
            return "Aruba";
        case "AFG":
            return "Afghanistan";
        case "AGO":
            return "Angola";
        case "AIA":
            return "Anguilla";
        case "ALA":
            return "Åland Islands";
        case "ALB":
            return "Albania";
        case "AND":
            return "Andorra";
        case "ARE":
            return "United Arab Emirates";
        case "ARG":
            return "Argentina";
        case "ARM":
            return "Armenia";
        case "ASM":
            return "American Samoa";
        case "ATA":
            return "Antarctica";
        case "ATF":
            return "French Southern Territories";
        case "ATG":
            return "Antigua and Barbuda";
        case "AUS":
            return "Australia";
        case "AUT":
            return "Austria";
        case "AZE":
            return "Azerbaijan";
        case "BDI":
            return "Burundi";
        case "BEL":
            return "Belgium";
        case "BEN":
            return "Benin";
        case "BES":
            return "Bonaire, Sint Eustatius and Saba";
        case "BFA":
            return "Burkina Faso";
        case "BGD":
            return "Bangladesh";
        case "BGR":
            return "Bulgaria";
        case "BHR":
            return "Bahrain";
        case "BHS":
            return "Bahamas";
        case "BIH":
            return "Bosnia and Herzegovina";
        case "BLM":
            return "Saint Barthélemy";
        case "BLR":
            return "Belarus";
        case "BLZ":
            return "Belize";
        case "BMU":
            return "Bermuda";
        case "BOL":
            return "Bolivia";
        case "BRA":
            return "Brazil";
        case "BRB":
            return "Barbados";
        case "BRN":
            return "Brunei";
        case "BTN":
            return "Bhutan";
        case "BVT":
            return "Bouvet Island";
        case "BWA":
            return "Botswana";
        case "CAF":
            return "Central African Republic";
        case "CAN":
            return "Canada";
        case "CCK":
            return "Cocos (Keeling) Islands";
        case "CHE":
            return "Switzerland";
        case "CHL":
            return "Chile";
        case "CHN":
            return "China";
        case "CIV":
            return "Côte d'Ivoire";
        case "CMR":
            return "Cameroon";
        case "COD":
            return "DR Congo";
        case "COG":
            return "Congo";
        case "COK":
            return "Cook Islands";
        case "COL":
            return "Colombia";
        case "COM":
            return "Comoros";
        case "CPV":
            return "Cabo Verde";
        case "CRI":
            return "Costa Rica";
        case "CUB":
            return "Cuba";
        case "CUW":
            return "Curaçao";
        case "CXR":
            return "Christmas Island";
        case "CYM":
            return "Cayman Islands";
        case "CYP":
            return "Cyprus";
        case "CZE":
            return "Czechia";
        case "DEU":
            return "Germany";
        case "DJI":
            return "Djibouti";
        case "DMA":
            return "Dominica";
        case "DNK":
            return "Denmark";
        case "DOM":
            return "Dominican Republic";
        case "DZA":
            return "Algeria";
        case "ECU":
            return "Ecuador";
        case "EGY":
            return "Egypt";
        case "ERI":
            return "Eritrea";
        case "ESH":
            return "Western Sahara";
        case "ESP":
            return "Spain";
        case "EST":
            return "Estonia";
        case "ETH":
            return "Ethiopia";
        case "FIN":
            return "Finland";
        case "FJI":
            return "Fiji";
        case "FLK":
            return "Falkland Islands (Malvinas)";
        case "FRA":
            return "France";
        case "FRO":
            return "Faroe Islands";
        case "FSM":
            return "Micronesia";
        case "GAB":
            return "Gabon";
        case "GBR":
            return "United Kingdom";
        case "GEO":
            return "Georgia";
        case "GGY":
            return "Guernsey";
        case "GHA":
            return "Ghana";
        case "GIB":
            return "Gibraltar";
        case "GIN":
            return "Guinea";
        case "GLP":
            return "Guadeloupe";
        case "GMB":
            return "Gambia";
        case "GNB":
            return "Guinea-Bissau";
        case "GNQ":
            return "Equatorial Guinea";
        case "GRC":
            return "Greece";
        case "GRD":
            return "Grenada";
        case "GRL":
            return "Greenland";
        case "GTM":
            return "Guatemala";
        case "GUF":
            return "French Guiana";
        case "GUM":
            return "Guam";
        case "GUY":
            return "Guyana";
        case "HKG":
            return "Hong Kong";
        case "HMD":
            return "Heard Island and McDonald Islands";
        case "HND":
            return "Honduras";
        case "HRV":
            return "Croatia";
        case "HTI":
            return "Haiti";
        case "HUN":
            return "Hungary";
        case "IDN":
            return "Indonesia";
        case "IMN":
            return "Isle of Man";
        case "IND":
            return "India";
        case "IOT":
            return "British Indian Ocean Territory";
        case "IRL":
            return "Ireland";
        case "IRN":
            return "Iran";
        case "IRQ":
            return "Iraq";
        case "ISL":
            return "Iceland";
        case "ISR":
            return "Israel";
        case "ITA":
            return "Italy";
        case "JAM":
            return "Jamaica";
        case "JEY":
            return "Jersey";
        case "JOR":
            return "Jordan";
        case "JPN":
            return "Japan";
        case "KAZ":
            return "Kazakhstan";
        case "KEN":
            return "Kenya";
        case "KGZ":
            return "Kyrgyzstan";
        case "KHM":
            return "Cambodia";
        case "KIR":
            return "Kiribati";
        case "KNA":
            return "Saint Kitts and Nevis";
        case "KOR":
            return "South Korea";
        case "KSV":
            return "Kosovo";
        case "KWT":
            return "Kuwait";
        case "LAO":
            return "Laos";
        case "LBN":
            return "Lebanon";
        case "LBR":
            return "Liberia";
        case "LBY":
            return "Libya";
        case "LCA":
            return "Saint Lucia";
        case "LIE":
            return "Liechtenstein";
        case "LKA":
            return "Sri Lanka";
        case "LSO":
            return "Lesotho";
        case "LTU":
            return "Lithuania";
        case "LUX":
            return "Luxembourg";
        case "LVA":
            return "Latvia";
        case "MAC":
            return "Macao";
        case "MAF":
            return "Saint Martin (French part)";
        case "MAR":
            return "Morocco";
        case "MCO":
            return "Monaco";
        case "MDA":
            return "Moldova";
        case "MDG":
            return "Madagascar";
        case "MDV":
            return "Maldives";
        case "MEX":
            return "Mexico";
        case "MHL":
            return "Marshall Islands";
        case "MKD":
            return "North Macedonia";
        case "MLI":
            return "Mali";
        case "MLT":
            return "Malta";
        case "MMR":
            return "Myanmar";
        case "MNE":
            return "Montenegro";
        case "MNG":
            return "Mongolia";
        case "MNP":
            return "Northern Mariana Islands";
        case "MOZ":
            return "Mozambique";
        case "MRT":
            return "Mauritania";
        case "MSR":
            return "Montserrat";
        case "MTQ":
            return "Martinique";
        case "MUS":
            return "Mauritius";
        case "MWI":
            return "Malawi";
        case "MYS":
            return "Malaysia";
        case "MYT":
            return "Mayotte";
        case "NAM":
            return "Namibia";
        case "NCL":
            return "New Caledonia";
        case "NER":
            return "Niger";
        case "NFK":
            return "Norfolk Island";
        case "NGA":
            return "Nigeria";
        case "NIC":
            return "Nicaragua";
        case "NIU":
            return "Niue";
        case "NLD":
            return "Netherlands";
        case "NOR":
            return "Norway";
        case "NPL":
            return "Nepal";
        case "NRU":
            return "Nauru";
        case "NZL":
            return "New Zealand";
        case "OMN":
            return "Oman";
        case "PAK":
            return "Pakistan";
        case "PAN":
            return "Panama";
        case "PCN":
            return "Pitcairn";
        case "PER":
            return "Peru";
        case "PHL":
            return "Philippines";
        case "PLW":
            return "Palau";
        case "PNG":
            return "Papua New Guinea";
        case "POL":
            return "Poland";
        case "PRI":
            return "Puerto Rico";
        case "PRK":
            return "North Korea";
        case "PRT":
            return "Portugal";
        case "PRY":
            return "Paraguay";
        case "PSE":
            return "Palestine";
        case "PYF":
            return "French Polynesia";
        case "QAT":
            return "Qatar";
        case "REU":
            return "Réunion";
        case "ROU":
            return "Romania";
        case "RUS":
            return "Russia";
        case "RWA":
            return "Rwanda";
        case "SAU":
            return "Saudi Arabia";
        case "SDN":
            return "Sudan";
        case "SEN":
            return "Senegal";
        case "SGP":
            return "Singapore";
        case "SGS":
            return "South Georgia and the South Sandwich Islands";
        case "SHN":
            return "Saint Helena, Ascension and Tristan da Cunha";
        case "SJM":
            return "Svalbard and Jan Mayen";
        case "SLB":
            return "Solomon Islands";
        case "SLE":
            return "Sierra Leone";
        case "SLV":
            return "El Salvador";
        case "SMR":
            return "San Marino";
        case "SOM":
            return "Somalia";
        case "SPM":
            return "Saint Pierre and Miquelon";
        case "SRB":
            return "Serbia";
        case "SSD":
            return "South Sudan";
        case "STP":
            return "Sao Tome and Principe";
        case "SUR":
            return "Suriname";
        case "SVK":
            return "Slovakia";
        case "SVN":
            return "Slovenia";
        case "SWE":
            return "Sweden";
        case "SWZ":
            return "Eswatini";
        case "SXM":
            return "Sint Maarten (Dutch part)";
        case "SYC":
            return "Seychelles";
        case "SYR":
            return "Syria";
        case "TCA":
            return "Turks and Caicos Islands";
        case "TCD":
            return "Chad";
        case "TGO":
            return "Togo";
        case "THA":
            return "Thailand";
        case "TJK":
            return "Tajikistan";
        case "TKL":
            return "Tokelau";
        case "TKM":
            return "Turkmenistan";
        case "TLS":
            return "Timor-Leste";
        case "TON":
            return "Tonga";
        case "TTO":
            return "Trinidad and Tobago";
        case "TUN":
            return "Tunisia";
        case "TUR":
            return "Türkiye";
        case "TUV":
            return "Tuvalu";
        case "TWN":
            return "Taiwan";
        case "TZA":
            return "Tanzania";
        case "UGA":
            return "Uganda";
        case "UKR":
            return "Ukraine";
        case "UMI":
            return "United States Minor Outlying Islands";
        case "URY":
            return "Uruguay";
        case "USA":
            return "United States";
        case "UZB":
            return "Uzbekistan";
        case "VAT":
            return "Holy See";
        case "VCT":
            return "Saint Vincent and the Grenadines";
        case "VEN":
            return "Venezuela";
        case "VGB":
            return "Virgin Islands (British)";
        case "VIR":
            return "Virgin Islands (U.S.)";
        case "VNM":
            return "Vietnam";
        case "VUT":
            return "Vanuatu";
        case "WLF":
            return "Wallis and Futuna";
        case "WSM":
            return "Samoa";
        case "YEM":
            return "Yemen";
        case "ZAF":
            return "South Africa";
        case "ZMB":
            return "Zambia";
        case "ZWE": 
            return "Zimbabwe";
        default:
             throw new Error("Alpha-03 code could not be decoded!"); 
    }
}

export default decodeAlpha03;