import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const cpfMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})/, "$1-$2")
    .replace(/(-\d{2})\d+?$/, "$1");
};

export const telefoneMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{4})\d+?$/, "$1");
};

export const cepMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{5})(\d)/, "$1-$2")
    .replace(/(-\d{3})\d+?$/, "$1");
};

export const rgMask = (value: string) => {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1");
};

export const Sexo = {
  Masculino: "Masculino",
  Feminino: "Feminino",
} as const;

export type Sexo = (typeof Sexo)[keyof typeof Sexo];

export const Uf = {
  AC: "AC",
  AL: "AL",
  AP: "AP",
  AM: "AM",
  BA: "BA",
  CE: "CE",
  DF: "DF",
  ES: "ES",
  GO: "GO",
  MA: "MA",
  MT: "MT",
  MS: "MS",
  MG: "MG",
  PA: "PA",
  PB: "PB",
  PR: "PR",
  PE: "PE",
  PI: "PI",
  RJ: "RJ",
  RN: "RN",
  RS: "RS",
  RO: "RO",
  RR: "RR",
  SC: "SC",
  SP: "SP",
  SE: "SE",
  TO: "TO",
} as const;

export type Uf = (typeof Uf)[keyof typeof Uf];

export const Conselho = {
  CRM: "CRM",
  CFM: "CFM",
} as const;

export type Conselho = (typeof Conselho)[keyof typeof Conselho];

export const Cbo = {
  "225103": "225103",
  "225105": "225105",
  "225106": "225106",
  "225109": "225109",
  "225110": "225110",
  "225112": "225112",
  "225115": "225115",
  "225118": "225118",
  "225120": "225120",
  "225121": "225121",
  "225122": "225122",
  "225124": "225124",
  "225125": "225125",
  "225127": "225127",
  "225130": "225130",
  "225133": "225133",
  "225135": "225135",
  "225136": "225136",
  "225139": "225139",
  "225140": "225140",
  "225142": "225142",
  "225145": "225145",
  "225148": "225148",
  "225150": "225150",
  "225151": "225151",
  "225154": "225154",
  "225155": "225155",
  "225160": "225160",
  "225165": "225165",
  "225170": "225170",
  "225175": "225175",
  "225180": "225180",
  "225185": "225185",
  "225195": "225195",
  "225203": "225203",
  "225210": "225210",
  "225215": "225215",
  "225220": "225220",
  "225225": "225225",
  "225230": "225230",
  "225235": "225235",
  "225240": "225240",
  "225250": "225250",
  "225255": "225255",
  "225260": "225260",
  "225265": "225265",
  "225270": "225270",
  "225275": "225275",
  "225280": "225280",
  "225285": "225285",
  "225290": "225290",
  "225295": "225295",
  "225305": "225305",
  "225310": "225310",
  "225315": "225315",
  "225320": "225320",
  "225325": "225325",
  "225330": "225330",
  "225335": "225335",
  "225340": "225340",
  "225345": "225345",
  "225350": "225350",
} as const;

export type Cbo = (typeof Cbo)[keyof typeof Cbo];

export const descricaoCbo = {
  "225103": "Médico infectologista",
  "225105": "Médico acupunturista",
  "225106": "Médico legista",
  "225109": "Médico nefrologista",
  "225110": "Médico alergista e imunologista",
  "225112": "Médico neurologista",
  "225115": "Médico angiologista",
  "225118": "Médico nutrologista",
  "225120": "Médico cardiologista",
  "225121": "Médico oncologista clínico",
  "225122": "Médico cancerologista pediátrico",
  "225124": "Médico pediatra",
  "225125": "Médico clínico",
  "225127": "Médico pneumologista",
  "225130": "Médico de família e comunidade",
  "225133": "Médico psiquiatra",
  "225135": "Médico dermatologista",
  "225136": "Médico reumatologista",
  "225139": "Médico sanitarista",
  "225140": "Médico do trabalho",
  "225142": "Médico da estratégia de saúde da família",
  "225145": "Médico em medicina de tráfego",
  "225148": "Médico anatomopatologista",
  "225150": "Médico em medicina intensiva",
  "225151": "Médico anestesiologista",
  "225154": "Médico antroposófico",
  "225155": "Médico endocrinologista e metabologista",
  "225160": "Médico fisiatra",
  "225165": "Médico gastroenterologista",
  "225170": "Médico generalista",
  "225175": "Médico geneticista",
  "225180": "Médico geriatra",
  "225185": "Médico hematologista",
  "225195": "Médico homeopata",
  "225203": "Médico em cirurgia vascular",
  "225210": "Médico cirurgião cardiovascular",
  "225215": "Médico cirurgião de cabeça e pescoço",
  "225220": "Médico cirurgião do aparelho digestivo",
  "225225": "Médico cirurgião geral",
  "225230": "Médico cirurgião pediátrico",
  "225235": "Médico cirurgião plástico",
  "225240": "Médico cirurgião torácico",
  "225250": "Médico ginecologista e obstetra",
  "225255": "Médico mastologista",
  "225260": "Médico neurocirurgião",
  "225265": "Médico oftalmologista",
  "225270": "Médico ortopedista e traumatologista",
  "225275": "Médico otorrinolaringologista",
  "225280": "Médico coloproctologista",
  "225285": "Médico urologista",
  "225290": "Médico cancerologista cirurgíco",
  "225295": "Médico cirurgião da mão",
  "225305": "Médico citopatologista",
  "225310": "Médico em endoscopia",
  "225315": "Médico em medicina nuclear",
  "225320": "Médico em radiologia e diagnóstico por imagem",
  "225325": "Médico patologista",
  "225330": "Médico radioterapeuta",
  "225335": "Médico patologista clínico / medicina laboratorial",
  "225340": "Médico hemoterapeuta",
  "225345": "Médico hiperbarista",
  "225350": "Médico neurofisiologista clínico",
};

export const appoinmentTimes = Array.from({ length: 11 }, (_, i) => i + 7).flatMap(hour =>
  Array.from({ length: 4 }, (_, i) => i * 15).map(minute => {
    return `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
  }),
);
