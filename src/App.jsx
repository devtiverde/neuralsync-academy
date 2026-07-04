import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'

// Páginas públicas (carregam logo — bundle separado mas pequenos)
const Landing = lazy(() => import('./pages/Landing'))
const Auth = lazy(() => import('./pages/Auth'))
const Planos = lazy(() => import('./pages/Planos'))
const RecuperarSenha = lazy(() => import('./pages/RecuperarSenha'))
const NovaSenha = lazy(() => import('./pages/NovaSenha'))
const Termos = lazy(() => import('./pages/Termos'))
const Privacidade = lazy(() => import('./pages/Privacidade'))

// Área pai
const Dashboard = lazy(() => import('./pages/pai/Dashboard'))
const Questionario = lazy(() => import('./pages/pai/Questionario'))
const PerfilCognitivo = lazy(() => import('./pages/pai/PerfilCognitivo'))
const Timer = lazy(() => import('./pages/pai/Timer'))
const Agenda = lazy(() => import('./pages/pai/Agenda'))
const Relatorio = lazy(() => import('./pages/pai/Relatorio'))
const RelatorioPDF = lazy(() => import('./pages/pai/RelatorioPDF'))
const Notificacoes = lazy(() => import('./pages/pai/Notificacoes'))
const TrilhaPai = lazy(() => import('./pages/pai/TrilhaPai'))
const Settings = lazy(() => import('./pages/pai/Settings'))
const RelatorioIA = lazy(() => import('./pages/pai/RelatorioIA'))
const PerfilFilhoPai = lazy(() => import('./pages/pai/PerfilFilhoPai'))

// Área criança
const HomeCrianca = lazy(() => import('./pages/crianca/HomeCrianca'))
const Trilha = lazy(() => import('./pages/crianca/Trilha'))
const TimerAtivo = lazy(() => import('./pages/crianca/TimerAtivo'))
const Encerramento = lazy(() => import('./pages/crianca/Encerramento'))
const PerfilCrianca = lazy(() => import('./pages/crianca/PerfilCrianca'))
const Personalizar = lazy(() => import('./pages/crianca/Personalizar'))
const Coins = lazy(() => import('./pages/crianca/Coins'))
const Ranking = lazy(() => import('./pages/crianca/Ranking'))
const Bloqueio = lazy(() => import('./pages/crianca/Bloqueio'))
const AtividadesOffline = lazy(() => import('./pages/crianca/AtividadesOffline'))
const Diario = lazy(() => import('./pages/crianca/Diario'))
const Digitacao = lazy(() => import('./pages/crianca/Digitacao'))
const NeuralAIHome = lazy(() => import('./pages/crianca/NeuralAIHome'))
const NeuralAIChat = lazy(() => import('./pages/crianca/NeuralAIChat'))
const NeuralAIEnd = lazy(() => import('./pages/crianca/NeuralAIEnd'))
const QuizIALivre = lazy(() => import('./pages/crianca/QuizIALivre'))

// Kids TV
const Kids = lazy(() => import('./pages/kids/Kids'))
const KidsCategoria = lazy(() => import('./pages/kids/KidsCategoria'))
const KidsVideo = lazy(() => import('./pages/kids/KidsVideo'))

// Loja + Ebook
const Loja = lazy(() => import('./pages/loja/Loja'))
const Ebook = lazy(() => import('./pages/ebook/Ebook'))
const EbookLeitura = lazy(() => import('./pages/ebook/EbookLeitura'))

// Atividades (cada uma vira chunk separado — isola jspdf, recharts, etc.)
const QuizAtividade = lazy(() => import('./pages/atividades/QuizAtividade'))
const MemoriaAtividade = lazy(() => import('./pages/atividades/MemoriaAtividade'))
const SequenciaAtividade = lazy(() => import('./pages/atividades/SequenciaAtividade'))
const LabirintoAtividade = lazy(() => import('./pages/atividades/LabirintoAtividade'))
const RoboAtividade = lazy(() => import('./pages/atividades/RoboAtividade'))
const PadraoAtividade = lazy(() => import('./pages/atividades/PadraoAtividade'))
const QuizIAAtividade = lazy(() => import('./pages/atividades/QuizIAAtividade'))
const InventorAtividade = lazy(() => import('./pages/atividades/InventorAtividade'))
const BlocosAtividade = lazy(() => import('./pages/atividades/BlocosAtividade'))
const NumerosAtividade = lazy(() => import('./pages/atividades/NumerosAtividade'))
const FormasAtividade = lazy(() => import('./pages/atividades/FormasAtividade'))
const CoresAtividade = lazy(() => import('./pages/atividades/CoresAtividade'))
const AlfabetoAtividade = lazy(() => import('./pages/atividades/AlfabetoAtividade'))
const SequenciaMagicaAtividade    = lazy(() => import('./pages/atividades/SequenciaMagicaAtividade'))
const QuebracabecaAtividade       = lazy(() => import('./pages/atividades/QuebracabecaAtividade'))
const CacaPalavrasAtividade       = lazy(() => import('./pages/atividades/CacaPalavrasAtividade'))
const HistoriaInterativaAtividade = lazy(() => import('./pages/atividades/HistoriaInterativaAtividade'))
const ClassificarObjetosAtividade = lazy(() => import('./pages/atividades/ClassificarObjetosAtividade'))
const ConectarPontosAtividade     = lazy(() => import('./pages/atividades/ConectarPontosAtividade'))
const InglesAtividade             = lazy(() => import('./pages/atividades/InglesAtividade'))
const ColorirAtividade            = lazy(() => import('./pages/atividades/ColorirAtividade'))
const SilabasAtividade            = lazy(() => import('./pages/atividades/SilabasAtividade'))
const Seeder = lazy(() => import('./pages/admin/Seeder'))

function PageLoader() {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ color: '#7C3AED', fontWeight: '700', fontSize: '16px' }}>Carregando...</div>
    </div>
  )
}

function PrivateRoute() {
  const { user, loading } = useAuth()
  if (loading) return <PageLoader />
  return user ? <Outlet /> : <Navigate to="/auth" replace />
}

function NotFound() {
  const { user, loading } = useAuth()
  if (loading) return <PageLoader />
  return <Navigate to={user ? '/dashboard' : '/'} replace />
}

function AppContent() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/planos" element={<Planos />} />
        <Route path="/recuperar-senha" element={<RecuperarSenha />} />
        <Route path="/nova-senha" element={<NovaSenha />} />
        <Route path="/termos" element={<Termos />} />
        <Route path="/privacidade" element={<Privacidade />} />
        {import.meta.env.DEV && <Route path="/admin/seed" element={<Seeder />} />}

        {/* Rotas protegidas */}
        <Route element={<PrivateRoute />}>
          {/* Pai */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/questionario/:childId" element={<Questionario />} />
          <Route path="/perfil-cognitivo/:childId" element={<PerfilCognitivo />} />
          <Route path="/timer" element={<Timer />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/relatorio" element={<Relatorio />} />
          <Route path="/relatorio-pdf" element={<RelatorioPDF />} />
          <Route path="/notificacoes" element={<Notificacoes />} />
          <Route path="/trilha-pai" element={<TrilhaPai />} />
          <Route path="/configuracoes" element={<Settings />} />
          <Route path="/relatorio-ia" element={<RelatorioIA />} />
          <Route path="/perfil-filho" element={<PerfilFilhoPai />} />

          {/* Criança */}
          <Route path="/home-crianca" element={<HomeCrianca />} />
          <Route path="/trilha" element={<Trilha />} />
          <Route path="/timer-ativo" element={<TimerAtivo />} />
          <Route path="/encerramento" element={<Encerramento />} />
          <Route path="/perfil-crianca" element={<PerfilCrianca />} />
          <Route path="/personalizar" element={<Personalizar />} />
          <Route path="/coins" element={<Coins />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/bloqueio" element={<Bloqueio />} />
          <Route path="/atividades-offline" element={<AtividadesOffline />} />
          <Route path="/diario" element={<Diario />} />
          <Route path="/digitacao" element={<Digitacao />} />
          <Route path="/neural-ai" element={<NeuralAIHome />} />
          <Route path="/neural-ai/chat" element={<NeuralAIChat />} />
          <Route path="/neural-ai/fim" element={<NeuralAIEnd />} />
          <Route path="/quiz-ia" element={<QuizIALivre />} />

          {/* Kids TV */}
          <Route path="/kids" element={<Kids />} />
          <Route path="/kids/:categoria" element={<KidsCategoria />} />
          <Route path="/kids/video/:id" element={<KidsVideo />} />

          {/* Loja + Ebook */}
          <Route path="/loja" element={<Loja />} />
          <Route path="/ebook" element={<Ebook />} />
          <Route path="/ebook/leitura" element={<EbookLeitura />} />

          {/* Atividades */}
          <Route path="/atividade/quiz" element={<QuizAtividade />} />
          <Route path="/atividade/memoria" element={<MemoriaAtividade />} />
          <Route path="/atividade/sequencia" element={<SequenciaAtividade />} />
          <Route path="/atividade/labirinto" element={<LabirintoAtividade />} />
          <Route path="/atividade/robo" element={<RoboAtividade />} />
          <Route path="/atividade/padrao" element={<PadraoAtividade />} />
          <Route path="/atividade/quizia" element={<QuizIAAtividade />} />
          <Route path="/atividade/inventor" element={<InventorAtividade />} />
          <Route path="/atividade/blocos" element={<BlocosAtividade />} />
          <Route path="/atividade/numeros" element={<NumerosAtividade />} />
          <Route path="/atividade/formas" element={<FormasAtividade />} />
          <Route path="/atividade/cores" element={<CoresAtividade />} />
          <Route path="/atividade/alfabeto" element={<AlfabetoAtividade />} />
          <Route path="/atividade/sequencia-magica"    element={<SequenciaMagicaAtividade />} />
          <Route path="/atividade/quebra-cabeca"       element={<QuebracabecaAtividade />} />
          <Route path="/atividade/caca-palavras"       element={<CacaPalavrasAtividade />} />
          <Route path="/atividade/historia-interativa" element={<HistoriaInterativaAtividade />} />
          <Route path="/atividade/classificar-objetos" element={<ClassificarObjetosAtividade />} />
          <Route path="/atividade/conectar-pontos"     element={<ConectarPontosAtividade />} />
          <Route path="/atividade/ingles"              element={<InglesAtividade />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  )
}

export default App
