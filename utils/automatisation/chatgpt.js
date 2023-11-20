import OpenAI from 'openai';

async function generateContent() {
    
    const openAI = new OpenAI({
        apiKey: process.env.OPENAIKEY,
      });
    
    const jsonFile = `Dans le but de créer du contenu
    pour mon site web qui est consacré aux événements en belgique,
    je te demanderai de me fournir un exemple de contenu du mois de décembre ou novembre 2023 au format JSON pour vous donner une idée de sa structure -> 
    {
      title: "",
      desc: "",
      date_debut: "",
      img: "",
      catSlug: "",
      source: "",
      slug: "",
      adresse: ""
    },
    - Pour le title (une title est un titre qui dois étre court),
    - une desc (la desc est une description de l'événement, il dois donner envis de venir et dois avoir au moin 300 mots clés), 
    - une date_debut (une date_debut est la date et elle dois étre de ce format exemple: 1970-01-01T00:00:00.000Z et dois étre 
      une date dans le futur et non dans le passé), 
    - une img (une img c'est l'url d'une image qui pointe vert une image qui décrit le post.), 
    - un catSlug (un catSlug est juste la catégorie du post qui dois tenir en un seul mot)  
    pour un événement (Visiter les Marchés de Noël, Manger des Frites Belges, 
    cinéma, balade, spéctacle humouristique,stand-up, match de foot, visite de patrimoine, Bandes Dessinées, Randonnée ou Vélo dans la Campagne,  
    Festivals de Musique, Visiter des Châteaux et des Sites Historiques, 
    activité culinaire. tu dois choisir aléatoirement l'un de ses événements à chaque demande) 
    qui à lieu en belgique (cette évenement dois réelement exister, tu dois donc faire une recherche sur internet et
    tu dois donc trouver un événement qui à réelement lieu), 
    - la source (un lien qui permettra aux visiteur de vérifier le lien), 
    - un slug (est comme le title de l'article mai dois avoir tout les caractéristiques d'un slug qui dois étre placé dans 
    l'url dans le but d'optimiser le SEO. exemple: les espaces doivent étre remplacés par des - et les accents 
    doivent étre remplacés et le texte dois étre mis en majuscule.),
    - une adresse (une adresse exacte de l'endrois ou à lieu l'événement).
    Je voudrais que tu m'envois ce texte comme si c'était un format json (je sais que tu ne peut pas me 
    générer un fichier json). je n'ai pas besoin que tu m'éxplique 
    ou que tu me commente le résultat. Si tu ne peut pas m'envoyer 
    le résultat en format json, envois null.`

    try {
      const chatCompletion = await openAI.chat.completions.create({
        messages: [{ role: 'user', content: jsonFile }],
        model: 'gpt-4',
      });
        
      return chatCompletion.choices[0].message.content;

    } catch (error) {
        console.error('Erreur lors de la génération du contenu c est mort mec:', error);
        return null;
    }
}

// Supposons que cette fonction soit appelée par votre planificateur de tâches
export {

  generateContent,

} 
