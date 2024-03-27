import {useEffect, useState} from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';
import './home.css'

function Home(){
    const [filmes, setFilmes] = useState([]); //Armazena os filmes do servidor no estado de filmes.
    const [loading, setLoading] = useState(true);

    useEffect( () =>{
        async function loadFilmes(){
            const response = await api.get('movie/now_playing',{
                params:{
                    api_key: '5a84f0a76be533d0d98cc4b5e803096c',
                    language: 'pt-BR',
                    page: 1,
                }
            })
            // console.log(response.data.results.slice(0, 10));
            setFilmes(response.data.results.slice(0, 10));
            setLoading(false); 
        }
        loadFilmes();
    }, []); //Executa a função quando o componente for montado na tela.
    if(loading){
        return(
            <div className='loading'>
                <h2>Carregando Filmes...</h2>
            </div>
        )
    }
    return(
        <div className='container'>
            <div className='lista-filmes'>
                {filmes.map((filme)=>{
                    return(
                        <article key={filme.id}>
                            <strong>{filme.title}</strong>
                            <img src={`https://image.tmdb.org/t/p/original/${filme.poster_path}`} alt={filme.title} />
                            <Link to={`/filme/${filme.id}`}>Acessar</Link>
                        </article>
                    )
                })}
            </div>
        </div>
    )
}
export default Home;