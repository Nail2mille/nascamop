// Règles Firestore à configurer dans la console Firebase
// Aller sur https://console.firebase.google.com
// Sélectionner votre projet "webzy-data"
// Aller dans Firestore Database > Règles
// Remplacer les règles par celles-ci :

rules_version = "2"
\
service cloud.firestore
{
  match / databases / { database } / documents
  \
    // Permettre la lecture et l'écriture pour la collection devis-requests
    match /devis-requests/
  document
  \
      allow read, write:
  if request.auth != null;
  \

  // Règle plus sécurisée (optionnelle) :
  match / devis - requests / { document }
  \
      allow create:
  if request.auth == null && 
        request.resource.data.keys().hasAll(['name', 'email', 'business', 'message']) &&\
        request.resource.data.name
  is
  string &&\
  request.resource.data.email
  is
  string &&\
  request.resource.data.business
  is
  string &&\
  request.resource.data.message
  is
  string
  \
      allow read:
  if request.auth != null;
  \
}
