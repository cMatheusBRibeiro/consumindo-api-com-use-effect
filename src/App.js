import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [racas, setRacas] = useState([]);
  const [busca, setBusca] = useState("");
  
  const buscarTodasRacas = () => {
    fetch("http://localhost:8080/doguinhos")
      .then((resposta) => resposta.json())
      .then((dados) => {
        setRacas(dados);
      });
  }

  const buscarRacaPorNome = () => {
    fetch(`http://localhost:8080/doguinhos?nome=${busca}`)
      .then((resposta) => resposta.json())
      .then((dados) => {
        setRacas(dados);
      });
  }

  useEffect(() => {
    buscarTodasRacas();
  }, []);

  useEffect(() => {
    if (busca.length < 3) {
      buscarTodasRacas();
      return;
    }
    buscarRacaPorNome();
  }, [busca]);

  return (
    <div className="App">
      <h1>Bem vindo aos doguinhos!</h1>
      <h4>Confira abaixo uma lista de raças dos doguinhos</h4>
      <input placeholder="Buscar por raça" onChange={(evento) => setBusca(evento.target.value)}/>
      <ul>
        {racas.map((raca) => <li key={raca.id}>{raca.nome}</li>)}
      </ul>
    </div>
  );
}

export default App;
