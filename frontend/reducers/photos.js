// ici action = l'objet reçu
export default function(photos = [], action) {
    if (action.type === 'addPhoto') {
        return [...photos, action.photoUrl]
    } else {
        return photos
    }
  }