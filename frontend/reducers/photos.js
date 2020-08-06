// ici action = l'objet reçu
export default function(photos = [], action) {
    if (action.type === 'addPhoto') {
        // nouvel objet
        var infos = {
            url: action.photoUrl,
            attribs: [
                action.attributes.gender,
                'age: ' + action.attributes.age,
                action.attributes.glasses,
                ]
        }
        // traitement des infos
        if (action.attributes.facialHair.beard >= 0.2)  {
            infos.attribs.push('beard')
        }
        if (action.attributes.hair.hairColor) {
            infos.attribs.push('hair color: ' + action.attributes.hair.hairColor[0].color)
        }
        console.log('info du Reducer : ', infos)
        return [...photos, infos]
    } else {
        return photos
    }
  }