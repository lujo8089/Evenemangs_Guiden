

export type Handelse = {
    host: string,
    coHost: string | undefined,
    location: string,
    heading: string,
    info: string,
    price: number | undefined,
    dateOfEvent: Date,
    dateOfPublish: Date,
    ticketRelease: string | undefined,
    attending: number | undefined,
    theme: string | undefined,
    URL: string,
}



export const IT_Event: Handelse = {
host: "IT-Sektionen",
coHost: undefined,
location: "Uthgård",
heading: "BÄR IT Woodstock '23",
info: `Woodstock är tillbaka!
       54 år efter originalet har nu Woodstock lämnat Max Yasgurs mjölkgård i New York och emigrerat över atlanten till vår kära Uppsala, närmare bestämt Uthgård! Istället för en 3 dagars festival kommer det bjudas på 2 rätters i allra högsta klass, med sång och spex som kommer få Woodstock ’69 se ut som en barnlek. Fram med peaceflaggorna och alla bra vibrationer och tagga till för ett trip du knappast kommer minnas.
       Datum: 4 mars
       Tid: 18dk
       Plats: Uthgård
       Pris: 235
       Klädkod: Udda Kavaj + Tema
       Tema: Woodstock
       Ingår: 2 rätter, 1 vinbjud, 1 snavec
       Biljettsläpp: 20 februari 12.15`,
price: 235,
dateOfEvent: new Date('2023-03-04T18:30:00'),
dateOfPublish: new Date('2023-02-16T10:51:00'),
ticketRelease: "20 Februari 12.15",
attending: 13,
theme: "Woodstock",
URL: "https://fb.me/e/10dRuUHY7",
}