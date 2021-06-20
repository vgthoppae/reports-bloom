
// export function fetchIdpUsers(val) {
//   fetch("https://60cce62171b73400171f8b3a.mockapi.io/get")
//       .then(res => res.json())
//       .then(
//         (result) => {
//           const names = [] 
//           for (var index in result) {
//             names.push(result[index]['name'])
//           }
//           console.log(names)
//           return names;
//         },
//         (error) => {
//           console.log(error)
//         }
//       )

// }

export async function fetchIdpUsers(val) {
  try {
    // const result = await fetch("https://60cce62171b73400171f8b3a.mockapi.io/data");
    const result = await fetch("https://5787a3jn58.execute-api.us-east-1.amazonaws.com/dev/pets/3");
    const jsonResult = await result.json()
    const names = []
    // for (var index in jsonResult) {
    //   names.push(jsonResult[index]['type'])
    // }
    names.push(jsonResult['type'])
    console.log(names)
    return names;    
  } catch (error) {
    console.log(error)
  }
}