import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Landing from './pages/Landing'
import Auth from './pages/Auth'
import Planos from './pages/Planos'
import Dashboard from './pages/pai/Dashboard'
import Questionario from './pages/pai/Questionario'
import PerfilCognitivo from './pages/pai/PerfilCognitivo'
import Timer from './pages/pai/Timer'
import Agenda from './pages/pai/Agenda'
import Relatorio from './pages/pai/Relatorio'
import RelatorioPDF from './pages/pai/RelatorioPDF'
import Notificacoes from './pages/pai/Notificacoes'
import HomeCrianca from './pages/crianca/HomeCrianca'
import Trilha from './pages/crianca/Trilha'
import TimerAtivo from './pages/crianca/TimerAtivo'
import Encerramento from './pages/crianca/Encerramento'
import PerfilCrianca from './pages/crianca/PerfilCrianca'
import Personalizar from './pages/crianca/Personalizar'
import Coins from './pages/crianca/Coins'
import Ranking from './pages/crianca/Ranking'
import Bloqueio from './pages/crianca/Bloqueio'
import Kids from './pages/kids/Kids'
import KidsCategoria from './pages/kids/KidsCategoria'
import KidsVideo from './pages/kids/KidsVideo'
import Loja from './pages/loja/Loja'
import Ebook from './pages/ebook/Ebook'
import EbookLeitura from './pages/ebook/EbookLeitura'
import Seeder from './pages/admin/Seeder'
import QuizAtividade from './pages/atividades/QuizAtividade'
import MemoriaAtividade from './pages/atividades/MemoriaAtividade'
import SequenciaAtividade from './pages/atividades/SequenciaAtividade'
import LabirintoAtividade from './pages/atividades/LabirintoAtividade'
import RoboAtividade from './pages/atividades/RoboAtividade'
import PadraoAtividade from './pages/atividades/PadraoAtividade'
import QuizIAAtividade from './pages/atividades/QuizIAAtividade'
import InventorAtividade from './pages/atividades/InventorAtividade'
import BlocosAtividade from './pages/atividades/BlocosAtividade'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/questionario/:childId" element={<Questionario />} />
        <Route path="/perfil-cognitivo/:childId" element={<PerfilCognitivo />} />
        <Route path="/timer" element={<Timer />} />
        <Route path="/agenda" element={<Agenda />} />
        <Route path="/relatorio" element={<Relatorio />} />
        <Route path="/relatorio-pdf" element={<RelatorioPDF />} />
        <Route path="/notificacoes" element={<Notificacoes />} />
        <Route path="/home-crianca" element={<HomeCrianca />} />
        <Route path="/trilha" element={<Trilha />} />
        <Route path="/timer-ativo" element={<TimerAtivo />} />
        <Route path="/encerramento" element={<Encerramento />} />
        <Route path="/perfil-crianca" element={<PerfilCrianca />} />
        <Route path="/personalizar" element={<Personalizar />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/bloqueio" element={<Bloqueio />} />
        <Route path="/kids" element={<Kids />} />
        <Route path="/kids/:categoria" element={<KidsCategoria />} />
        <Route path="/kids/video/:id" element={<KidsVideo />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/ebook" element={<Ebook />} />
        <Route path="/ebook/leitura" element={<EbookLeitura />} />
        <Route path="/atividade/quiz" element={<QuizAtividade />} />
        <Route path="/atividade/memoria" element={<MemoriaAtividade />} />
        <Route path="/atividade/sequencia" element={<SequenciaAtividade />} />
        <Route path="/atividade/labirinto" element={<LabirintoAtividade />} />
        <Route path="/atividade/robo" element={<RoboAtividade />} />
        <Route path="/atividade/padrao"   element={<PadraoAtividade />} />
        <Route path="/atividade/quizia"   element={<QuizIAAtividade />} />
        <Route path="/atividade/inventor" element={<InventorAtividade />} />
        <Route path="/atividade/blocos"   element={<BlocosAtividade />} />
        <Route path="/admin/seed" element={<Seeder />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App