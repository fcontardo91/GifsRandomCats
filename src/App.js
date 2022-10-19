import React, { useEffect, useState } from 'react'

const GIPHY_API_KEY = '5nQHf2nOBJ3f4OalasrXo6lMSe22r326'

export const App = () => {

    const [number, setNumber] = useState(0)
    const [catAPI, setCatAPI] = useState('')
    const [giphyAPI, setGiphyAPI] = useState(null)
    const [info, setInfo] = useState(null)

    const catFetchAPI =  () => {
        fetch('https://catfact.ninja/fact')
        .then(res => res.json())
        .then(async (res) => {
            setCatAPI(res.fact)
            setInfo(res.fact.split(' ',3).join(' '))
            giphyFetchAPI()
        })
    }

    const giphyFetchAPI = () => {
        fetch('https://api.giphy.com/v1/gifs/search?q='+ info + '&api_key=' + GIPHY_API_KEY + '&limit=20')
         .then(res => res.json())
         .then(res => {
            setGiphyAPI(res.data)
         })
    }

    // eslint-disable-next-line
    useEffect(catFetchAPI,[])

    const changePhotoPhrase = () => {
        setGiphyAPI(null)
        setNumber(0)
        catFetchAPI()
    }


    return (
        <div class="container">
        {(giphyAPI === null) ? (
            <>
                <h1>Cargando...</h1>
            </>
        ):(
            <>
                
                <div class="card mb-3 mt-2">
                    <div class="card-header">
                        <h4>FOTOS Y FRASES DE GATITOS RANDOM</h4>
                    </div>
                <div class="row g-0">
                <div class="col-md-4">
                <img src={giphyAPI[number].images.original.url}  class="img-fluid rounded-start" alt={info}/>
                </div>
                <div class="col-md-8">
                <div class="card-body">
                    <p class="card-text">{catAPI}</p>
                    <button class="btn btn-primary justify-content-end" onClick={() => setNumber(number +1)}>CAMBIAR FOTO</button>
                </div>
                </div>
            </div>
                <button onClick={() => changePhotoPhrase()} class="btn btn-block text-center btn-secondary">CAMBIAR FRASE Y FOTO</button>
            </div>
            
            </>
        )}
        </div>
    )
}