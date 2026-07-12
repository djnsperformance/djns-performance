import { useState, useEffect, useRef } from "react";
import { 
  motion, 
  AnimatePresence,
  useInView
} from "motion/react";
import { 
  CalendarX, 
  TrendingDown, 
  EyeOff, 
  Check, 
  Search, 
  Sliders, 
  Zap, 
  TrendingUp, 
  MessageSquare, 
  ArrowRight, 
  Settings, 
  X, 
  Phone, 
  Sparkles, 
  Radar,
  Users,
  Award,
  Clock,
  ShieldCheck,
  Stethoscope,
  Dumbbell,
  Utensils,
  Scissors,
  ShoppingBag,
  Wrench,
  Briefcase,
  UserCheck,
  Instagram,
  Facebook,
  Mail,
  ChevronDown,
  ChevronUp,
  Shield,
  FileText
} from "lucide-react";

// Micro-component for high-quality animated counter
function AnimatedCounter({ value, duration = 1200, suffix = "" }: { value: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }, [value, duration, isInView]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function App() {
  // State for WhatsApp settings (persisted in localStorage)
  const [phoneNumber, setPhoneNumber] = useState("5511999999999");
  const [customMessage, setCustomMessage] = useState(
    "Olá! Gostaria de solicitar um diagnóstico gratuito para minha empresa."
  );
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // States for FAQ Accordion, Privacy Policy & Terms modals
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);

  // Load configuration from localStorage on mount
  useEffect(() => {
    const savedPhone = localStorage.getItem("djns_phone");
    const savedMessage = localStorage.getItem("djns_message");
    if (savedPhone) setPhoneNumber(savedPhone);
    if (savedMessage) setCustomMessage(savedMessage);

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const saveConfiguration = (phone: string, msg: string) => {
    setPhoneNumber(phone);
    setCustomMessage(msg);
    localStorage.setItem("djns_phone", phone);
    localStorage.setItem("djns_message", msg);
    setIsConfigOpen(false);
  };

  // Build the dynamic WhatsApp Link
  const getWhatsAppLink = (overrideMessage?: string) => {
    const msg = overrideMessage || customMessage;
    const encodedMessage = encodeURIComponent(msg);
    return `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
  };

  const triggerWhatsApp = (overrideMessage?: string) => {
    window.open(getWhatsAppLink(overrideMessage), "_blank");
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Target segments data
  const segments = [
    { name: "Clínicas & Consultórios", icon: Stethoscope, tag: "Saúde", message: "Olá Douglas! Sou do setor de Clínicas e gostaria de solicitar meu diagnóstico de crescimento." },
    { name: "Academias & Studios", icon: Dumbbell, tag: "Fitness", message: "Olá Douglas! Sou do setor de Academias/Studios e gostaria do diagnóstico de crescimento." },
    { name: "Restaurantes & Delivery", icon: Utensils, tag: "Alimentação", message: "Olá Douglas! Sou do setor de Alimentação e quero atrair mais clientes na minha região." },
    { name: "Barbearias & Salões", icon: Scissors, tag: "Beleza", message: "Olá Douglas! Sou do setor de Beleza e quero encher minha agenda com novos clientes." },
    { name: "Lojas & Varejo Local", icon: ShoppingBag, tag: "Comércio", message: "Olá Douglas! Sou do setor de Comércio Local e quero aumentar o movimento da minha loja." },
    { name: "Oficinas & Automotivo", icon: Wrench, tag: "Serviços", message: "Olá Douglas! Sou do setor Automotivo e quero receber mais orçamentos no WhatsApp." },
    { name: "Escritórios de Advocacia/Contabilidade", icon: Briefcase, tag: "Profissional", message: "Olá Douglas! Sou do setor de Serviços Profissionais e busco atrair clientes qualificados." },
    { name: "Prestadores de Serviços", icon: UserCheck, tag: "Geral", message: "Olá Douglas! Sou Prestador de Serviços e quero gerar mais oportunidades comerciais." },
  ];

  return (
    <div className="min-h-screen bg-brand-dark text-white font-sans overflow-x-hidden selection:bg-brand-blue/30 selection:text-white pb-12 sm:pb-0">
      
      {/* 1. Dynamic Floating WhatsApp Button (Persistent & High Contrast) */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        <motion.button
          onClick={() => triggerWhatsApp()}
          className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-display font-bold py-3.5 px-6 rounded-full shadow-2xl hover:shadow-emerald-500/30 transform hover:-translate-y-1 transition-all duration-300 group cursor-pointer"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1 }}
          id="whatsapp-floating-btn"
        >
          <span className="relative flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white"></span>
          </span>
          <MessageSquare className="w-5 h-5 fill-white/10" />
          <span className="text-sm tracking-wide font-extrabold">Falar no WhatsApp</span>
        </motion.button>
      </div>

      {/* 2. Header (Navbar) */}
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled 
            ? "py-3 bg-brand-dark/95 backdrop-blur-md border-white/10 shadow-lg" 
            : "py-6 bg-transparent border-transparent"
        }`}
        id="navbar"
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span className="font-display font-extrabold text-xl tracking-tight">
              DJNS<span className="text-brand-blue">PERFORMANCE</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsConfigOpen(true)}
              className="p-2 text-brand-gray hover:text-white hover:bg-white/5 rounded-lg transition-colors duration-200 cursor-pointer"
              title="Configurar Link de WhatsApp"
              id="btn-config"
            >
              <Settings className="w-5 h-5 animate-spin-slow" />
            </button>
            <button 
              onClick={() => triggerWhatsApp()}
              className="hidden sm:flex items-center gap-2 px-5 py-2.5 bg-brand-blue hover:bg-blue-700 text-white font-display font-semibold text-sm rounded-lg hover:shadow-lg hover:shadow-brand-blue/10 transform hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"
              id="btn-header-cta"
            >
              Falar com Especialista
              <MessageSquare className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area in Storytelling Sequence */}
      <main className="relative pt-20">
        
        {/* Background Ambient Glows */}
        <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[500px] h-[500px] bg-brand-blue/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-[40%] right-10 w-[400px] h-[400px] bg-brand-orange/5 rounded-full blur-[140px] pointer-events-none" />

        {/* ========================================================
            1. HERO SECTION (PRIMEIRA DOBRA)
           ======================================================== */}
        <section className="relative py-12 md:py-24 px-6 md:px-12 max-w-7xl mx-auto animate-fade-in" id="hero">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Outcome-focused copywriting */}
            <motion.div 
              className="lg:col-span-7 flex flex-col items-start text-left"
              initial={{ opacity: 0, y: 35 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-brand-blue/10 border border-brand-blue/20 text-brand-blue rounded-full text-xs font-semibold uppercase tracking-wider font-display mb-6">
                <Sparkles className="w-3.5 h-3.5 text-brand-blue animate-pulse" />
                Crescimento e Faturamento Comercial
              </span>

              <h1 className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-6 text-white">
                Seu próximo cliente está procurando sua empresa <span className="text-gradient">neste exato momento.</span>
              </h1>

              <p className="text-brand-gray text-base sm:text-lg md:text-xl max-w-xl leading-relaxed mb-8">
                Enquanto seus concorrentes aparecem no Google e Instagram, sua empresa pode estar perdendo vendas todos os dias. A DJNS Performance ajuda negócios locais a serem encontrados por quem realmente está pronto para comprar.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mb-8">
                <button 
                  onClick={() => triggerWhatsApp("Olá Douglas! Gostaria de solicitar meu diagnóstico de crescimento gratuito.")}
                  className="w-full sm:w-auto px-8 py-5 bg-brand-blue hover:bg-blue-700 text-white font-display font-extrabold rounded-xl shadow-2xl hover:shadow-brand-blue/40 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 group cursor-pointer text-base"
                  id="btn-hero-cta"
                >
                  Solicitar Diagnóstico Gratuito
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>

                <button 
                  onClick={() => scrollToSection("problems")}
                  className="w-full sm:w-auto px-8 py-5 bg-white/5 hover:bg-white/10 text-white font-display font-bold rounded-xl border border-white/10 hover:border-white/20 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer text-base"
                  id="btn-hero-secondary"
                >
                  Como funciona
                </button>
              </div>

              {/* Trust indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full border-t border-white/5 pt-6 text-left">
                <div className="flex items-center gap-2 text-xs text-brand-gray font-medium">
                  <span className="w-1.5 h-1.5 bg-brand-blue rounded-full" />
                  <span>✔ Resposta em até 30 minutos</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-gray font-medium">
                  <span className="w-1.5 h-1.5 bg-brand-orange rounded-full" />
                  <span>✔ Atendimento personalizado</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-brand-gray font-medium">
                  <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                  <span>✔ Sem compromisso</span>
                </div>
              </div>
            </motion.div>

            {/* Right Column: Dynamic radar and pipeline tracker (Selling business outcomes) */}
            <motion.div 
              className="lg:col-span-5 flex justify-center items-center relative min-h-[350px]"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            >
              <div className="relative w-full max-w-[360px] aspect-square rounded-2xl bg-brand-card/60 border border-white/5 p-8 flex flex-col justify-between overflow-hidden shadow-2xl backdrop-blur-sm">
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand-blue/10 rounded-full animate-pulse blur-xl" />

                <div className="relative z-10 flex justify-between items-center">
                  <div className="text-left">
                    <span className="text-[10px] text-brand-orange uppercase tracking-wider block font-bold">CAIXA ATIVO</span>
                    <span className="font-display font-extrabold text-base text-white">Previsão Comercial</span>
                  </div>
                  <span className="px-2 py-0.5 bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 text-[9px] font-mono rounded font-semibold uppercase animate-pulse">
                    NOVOS CLIENTES
                  </span>
                </div>

                {/* Growth Outcome tracker representation */}
                <div className="relative z-10 my-4 h-28 flex items-end gap-3.5 justify-center">
                  <motion.div 
                    className="w-10 bg-white/5 rounded-t-lg border-t border-white/10 flex flex-col justify-end items-center pb-2 text-[9px] text-brand-gray font-mono h-[35%]"
                    animate={{ height: ["35%", "50%", "30%", "35%"] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  >
                    <span>Contatos</span>
                  </motion.div>
                  <motion.div 
                    className="w-10 bg-brand-orange/20 rounded-t-lg border-t border-brand-orange/40 flex flex-col justify-end items-center pb-2 text-[9px] text-brand-orange font-mono h-[65%]"
                    animate={{ height: ["65%", "50%", "75%", "65%"] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                  >
                    <span>WhatsApp</span>
                  </motion.div>
                  <motion.div 
                    className="w-12 bg-emerald-500/30 rounded-t-lg border-t border-emerald-400/50 flex flex-col justify-end items-center pb-2 text-[9px] text-emerald-300 font-mono font-bold h-[85%] relative overflow-hidden"
                    animate={{ height: ["85%", "95%", "90%", "85%"] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                  >
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-emerald-300/40 animate-pulse" />
                    <span>Vendas</span>
                  </motion.div>
                </div>

                <div className="relative z-10 grid grid-cols-3 gap-2 border-t border-white/5 pt-4 text-center">
                  <div>
                    <span className="text-[9px] text-brand-gray block">Agenda Cheia</span>
                    <span className="font-display font-bold text-xs text-brand-orange">
                      +<AnimatedCounter value={350} suffix="%" />
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-brand-gray block">Novos Clientes</span>
                    <span className="font-display font-bold text-xs text-brand-blue">Diários</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-brand-gray block">ROI de Vendas</span>
                    <span className="font-display font-bold text-xs text-emerald-400">Garantido</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================
            2. PROBLEMAS (GATILHOS EMOCIONAIS DE DOR)
           ======================================================== */}
        <section className="py-20 border-t border-white/5 bg-brand-card/25 relative" id="problems">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-xs text-brand-orange uppercase tracking-wider font-display font-semibold block mb-3">
                A Realidade do Seu Mercado
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
                O quanto a falta de posicionamento comercial está custando para a sua empresa?
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              
              {/* Problem 1 - Emotional Pain */}
              <motion.div 
                className="group relative bg-brand-card border border-white/5 hover:border-brand-orange/30 rounded-2xl p-8 md:p-10 transition-all duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                id="problem-card-1"
              >
                <div>
                  <div className="p-3 bg-brand-orange/10 border border-brand-orange/20 rounded-xl text-brand-orange w-fit mb-6 transition-transform group-hover:scale-105">
                    <CalendarX className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold mb-4 text-white group-hover:text-brand-orange transition-colors leading-snug">
                    Você abre as portas da sua empresa todos os dias sem saber quantos clientes vão aparecer?
                  </h3>
                  <p className="text-brand-gray leading-relaxed text-sm">
                    Depender exclusivamente de indicações ou de pessoas que passam na rua impede você de prever o faturamento e planejar o crescimento da sua empresa com segurança financeira.
                  </p>
                </div>
              </motion.div>

              {/* Problem 2 - Concorrentes em Alta */}
              <motion.div 
                className="group relative bg-brand-card border border-white/5 hover:border-brand-orange/30 rounded-2xl p-8 md:p-10 transition-all duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
                id="problem-card-2"
              >
                <div>
                  <div className="p-3 bg-brand-orange/10 border border-brand-orange/20 rounded-xl text-brand-orange w-fit mb-6 transition-transform group-hover:scale-105">
                    <EyeOff className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold mb-4 text-white group-hover:text-brand-orange transition-colors leading-snug">
                    Enquanto seus concorrentes aparecem no Google e Instagram, sua empresa continua invisível?
                  </h3>
                  <p className="text-brand-gray leading-relaxed text-sm">
                    Empresas menores e com entregas inferiores estão faturando mais que você na sua região simplesmente porque sabem aparecer para quem está com o cartão na mão pronto para comprar.
                  </p>
                </div>
              </motion.div>

              {/* Problem 3 - Dinheiro Rasgado */}
              <motion.div 
                className="group relative bg-brand-card border border-white/5 hover:border-brand-orange/30 rounded-2xl p-8 md:p-10 transition-all duration-300 flex flex-col justify-between"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                id="problem-card-3"
              >
                <div>
                  <div className="p-3 bg-brand-orange/10 border border-brand-orange/20 rounded-xl text-brand-orange w-fit mb-6 transition-transform group-hover:scale-105">
                    <TrendingDown className="w-6 h-6" />
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold mb-4 text-white group-hover:text-brand-orange transition-colors leading-snug">
                    Cansado de jogar dinheiro fora com postagens bonitinhas ou cliques sem retorno?
                  </h3>
                  <p className="text-brand-gray leading-relaxed text-sm">
                    Curtidas e seguidores não pagam contas. Você precisa de um funil automatizado focado em fazer o seu telefone tocar e o seu WhatsApp receber propostas comerciais reais.
                  </p>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ========================================================
            3. COMPARATIVO ANTES VS DEPOIS (SIMULAÇÃO VISUAL)
           ======================================================== */}
        <section className="py-20 border-t border-white/5 bg-brand-dark relative" id="comparison">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-xs text-brand-blue uppercase tracking-wider font-display font-semibold block mb-3">
                A Grande Mudança
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
                Como muda o jogo comercial do seu negócio local?
              </h2>
              <p className="text-brand-gray text-sm md:text-base mt-3">
                Pare de vender a ferramenta de anúncios e passe a colher resultados comerciais práticos na sua conta corrente.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              
              {/* ANTES DA DJNS */}
              <motion.div 
                className="bg-brand-card/40 border border-red-500/20 rounded-3xl p-8 shadow-xl flex flex-col justify-between relative overflow-hidden"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Red outline light glow */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <span className="px-3.5 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold uppercase tracking-wider font-display rounded-full inline-block mb-6">
                    Antes da DJNS Performance
                  </span>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-500/10 text-red-400 rounded-xl mt-0.5">
                        <span className="font-display text-lg font-bold">📅</span>
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white text-base">Agenda vazia e imprevisível</h4>
                        <p className="text-brand-gray text-xs sm:text-sm mt-1 leading-relaxed">Você depende da sorte, do tempo de chuva e das indicações esporádicas para bater a meta mensal.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-500/10 text-red-400 rounded-xl mt-0.5">
                        <span className="font-display text-lg font-bold">☎</span>
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white text-base">Poucos contatos comerciais</h4>
                        <p className="text-brand-gray text-xs sm:text-sm mt-1 leading-relaxed">O telefone não toca, os funcionários ficam parados e o custo fixo continua chegando pontualmente.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-red-500/10 text-red-400 rounded-xl mt-0.5">
                        <span className="font-display text-lg font-bold">📉</span>
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white text-base">Vendas imprevisíveis</h4>
                        <p className="text-brand-gray text-xs sm:text-sm mt-1 leading-relaxed">Incerteza se vai fechar o mês no azul e impossibilidade de planejar investimentos ou reformas.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/5 pt-4 text-center">
                  <span className="text-xs text-red-400 font-medium tracking-wide block">Sua empresa dependente de sorte</span>
                </div>
              </motion.div>

              {/* DEPOIS DA DJNS */}
              <motion.div 
                className="bg-brand-card border-2 border-brand-blue rounded-3xl p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden"
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Blue/Green glowing accents */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-brand-blue/15 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <span className="px-3.5 py-1.5 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold uppercase tracking-wider font-display rounded-full inline-block mb-6 animate-pulse">
                    Depois da DJNS Performance
                  </span>
                  
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-emerald-500/15 text-emerald-400 rounded-xl mt-0.5">
                        <span className="font-display text-lg font-bold">📈</span>
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white text-base">Atração contínua e faturamento real</h4>
                        <p className="text-brand-gray text-xs sm:text-sm mt-1 leading-relaxed">Você sabe exatamente quanto investe em publicidade e quantos novos clientes são gerados com lucro.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-emerald-500/15 text-emerald-400 rounded-xl mt-0.5">
                        <span className="font-display text-lg font-bold">📲</span>
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white text-base">Mais mensagens no WhatsApp</h4>
                        <p className="text-brand-gray text-xs sm:text-sm mt-1 leading-relaxed">Seu time comercial recebe contatos qualificados de pessoas da sua cidade querendo contratar ou comprar.</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-emerald-500/15 text-emerald-400 rounded-xl mt-0.5">
                        <span className="font-display text-lg font-bold">💰</span>
                      </div>
                      <div>
                        <h4 className="font-display font-bold text-white text-base">Mais oportunidades e caixa cheio</h4>
                        <p className="text-brand-gray text-xs sm:text-sm mt-1 leading-relaxed">Previsibilidade para escalar o negócio, contratar mais colaboradores e dominar a região local.</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 border-t border-white/5 pt-4 text-center">
                  <span className="text-xs text-emerald-400 font-bold tracking-wider block uppercase">Seu negócio no radar da sua cidade</span>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ========================================================
            4. SEÇÃO "PARA QUEM TRABALHAMOS" (IDEAL PARA)
           ======================================================== */}
        <section className="py-20 border-t border-white/5 bg-brand-card/20 relative" id="ideal-for">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-xs text-brand-blue uppercase tracking-wider font-display font-semibold block mb-3">
                Nossos Segmentos Alvo
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
                Desenvolvemos o faturamento ideal para o seu segmento
              </h2>
              <p className="text-brand-gray text-sm md:text-base mt-3 max-w-xl mx-auto">
                Se o seu negócio atende localmente e depende de contato direto ou agendamentos, o Método DJNS™ foi desenhado sob medida para você.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {segments.map((seg, idx) => (
                <motion.div 
                  key={idx}
                  onClick={() => triggerWhatsApp(seg.message)}
                  className="group relative bg-brand-card/40 hover:bg-brand-card border border-white/5 hover:border-brand-blue/30 rounded-2xl p-5 sm:p-6 transition-all duration-300 cursor-pointer hover:shadow-xl hover:shadow-brand-blue/5 flex flex-col items-start text-left justify-between"
                  whileHover={{ y: -4 }}
                  id={`segment-card-${idx}`}
                >
                  <div>
                    <span className="text-[9px] font-mono font-bold uppercase text-brand-orange bg-brand-orange/5 px-2.5 py-1 rounded-md mb-4 inline-block">
                      {seg.tag}
                    </span>
                    <div className="p-3 bg-brand-blue/10 border border-brand-blue/20 rounded-xl text-brand-blue w-fit mb-4 group-hover:bg-brand-blue group-hover:text-white transition-all duration-300">
                      <seg.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <h3 className="font-display text-sm sm:text-base font-bold text-white group-hover:text-brand-blue transition-colors leading-snug">
                      {seg.name}
                    </h3>
                  </div>
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-brand-gray group-hover:text-white transition-colors">
                    <span>Atrair Clientes</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================
            5. SOLUÇÃO (RADAR INTEGRADO)
           ======================================================== */}
        <section className="py-20 border-t border-white/5 max-w-7xl mx-auto px-6 md:px-12" id="solution">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column */}
            <motion.div 
              className="lg:col-span-7"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-xs text-brand-blue uppercase tracking-wider font-display font-semibold block mb-2">
                A Solução de Presença
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight mb-6 text-white leading-tight">
                Colocamos o seu estabelecimento no topo da decisão de compra
              </h2>
              <p className="text-brand-gray text-base md:text-lg leading-relaxed mb-8">
                Paramos de atrair curiosos ou curtidas vazias e focamos nossa inteligência regional em canais com compradores prontos para fechar negócio. Garantimos que sua verba retorne em mensagens diretas de interessados no seu WhatsApp comercial.
              </p>

              <ul className="space-y-4">
                {[
                  { title: "Geo-Segmentação Local Próxima", desc: "Sua marca atinge exatamente quem mora, trabalha ou transita no raio ideal do seu negócio físico (de 5km a 15km)." },
                  { title: "Canal Direto de Agendamento", desc: "Funil projetado para transformar o clique do anúncio em uma mensagem direta no seu WhatsApp, de forma simples." },
                  { title: "Métricas de Retorno (ROI) Reais", desc: "Esqueça relatórios técnicos complexos. Mostramos de forma simples quantos contatos novos chegaram e qual seu faturamento." }
                ].map((item, idx) => (
                  <li key={idx} className="flex gap-4 items-start">
                    <div className="flex-shrink-0 mt-1 p-1 bg-brand-blue/10 border border-brand-blue/20 rounded-full text-brand-blue">
                      <Check className="w-4 h-4" />
                    </div>
                    <div>
                      <h4 className="font-display font-bold text-sm md:text-base text-white">{item.title}</h4>
                      <p className="text-brand-gray text-xs md:text-sm mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Right Column: Interactive Radar Graphic */}
            <motion.div 
              className="lg:col-span-5 flex justify-center"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="w-full max-w-[360px] aspect-square rounded-2xl bg-brand-card border border-white/5 p-6 relative flex flex-col items-center justify-center overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-brand-dark/10" />
                
                <div className="relative w-60 h-60 border border-brand-blue/10 rounded-full flex items-center justify-center">
                  <div className="absolute w-44 h-44 border border-brand-blue/15 rounded-full" />
                  <div className="absolute w-28 h-28 border border-brand-blue/20 rounded-full" />
                  <div className="absolute w-14 h-14 border border-brand-blue/30 rounded-full" />
                  
                  {/* Radar Sweep Animation */}
                  <motion.div 
                    className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-t from-transparent via-brand-blue to-brand-blue/80 origin-center"
                    animate={{ rotate: 360 }}
                    transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                    style={{ height: '50%', transformOrigin: 'bottom center' }}
                  />

                  {/* Pulsing Target Dots */}
                  <div className="absolute top-[22%] left-[20%]">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-orange opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-orange"></span>
                    </span>
                    <span className="absolute left-4 top-[-4px] text-[8px] font-mono bg-brand-card/90 px-1 border border-white/10 rounded text-brand-orange whitespace-nowrap">Comprador Pronto</span>
                  </div>

                  <div className="absolute bottom-[25%] right-[15%]">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-blue opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-blue"></span>
                    </span>
                    <span className="absolute left-4 top-[-4px] text-[8px] font-mono bg-brand-card/90 px-1 border border-white/10 rounded text-brand-blue whitespace-nowrap">Cliente da Cidade</span>
                  </div>

                  <Radar className="w-6 h-6 text-brand-blue/30 absolute animate-pulse" />
                </div>

                <div className="mt-4 text-center relative z-10 w-full">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-brand-gray block mb-1">Mapeamento em Tempo Real</span>
                  <p className="text-xs text-white/90">Análise de vizinhança: <span className="text-brand-blue font-bold">5km - 15km</span> do estabelecimento</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================
            6. MÉTODO DJNS™ (TIMELINE PREMIUM)
           ======================================================== */}
        <section className="py-20 border-t border-white/5 bg-brand-card/10 relative" id="method">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            
            <div className="max-w-3xl mx-auto text-center mb-16">
              <span className="text-xs text-brand-blue uppercase tracking-wider font-display font-semibold block mb-3">
                Identidade & Processo Exclusivo
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-extrabold tracking-tight">
                O Método DJNS™ de Performance
              </h2>
              <p className="text-brand-gray text-sm md:text-base mt-4 max-w-xl mx-auto">
                Uma estratégia testada e validada de ponta a ponta para guiar o faturamento da sua empresa em direção ao topo.
              </p>
            </div>

            {/* Premium Timeline Layout */}
            <div className="relative border-l border-white/10 ml-4 md:ml-12 space-y-12">
              {[
                { 
                  step: "01", 
                  title: "Diagnóstico", 
                  desc: "Analisamos minuciosamente o seu mercado local, o seu raio geográfico de atuação ideal e seus principais concorrentes para identificar oportunidades imediatas de venda no primeiro mês." 
                },
                { 
                  step: "02", 
                  title: "Estratégia", 
                  desc: "Desenvolvemos sua estrutura de atração de clientes (configuramos seu pixel de conversão, tags do Google Maps e estruturamos as primeiras campanhas focadas em WhatsApp)." 
                },
                { 
                  step: "03", 
                  title: "Implementação", 
                  desc: "Criamos anúncios visualmente marcantes e copys altamente persuasivas no Google Ads e Meta Ads, focados exclusivamente em fazer o comprador ideal clicar e mandar mensagem." 
                },
                { 
                  step: "04", 
                  title: "Otimização", 
                  desc: "Analisamos e ajustamos as métricas das campanhas diariamente para reduzir progressivamente o custo de cada lead e aumentar a conversão de cliques em mensagens reais." 
                },
                { 
                  step: "05", 
                  title: "Escala", 
                  desc: "Com o funil de atração validado e gerando faturamento real, aumentamos o investimento de forma gradativa para maximizar o volume de vendas mantendo um ROI altamente saudável." 
                }
              ].map((item, idx) => (
                <div key={idx} className="relative pl-8 sm:pl-12 group" id={`timeline-step-${idx + 1}`}>
                  
                  {/* Step bullet */}
                  <div className="absolute -left-[17px] top-1.5 flex items-center justify-center w-8 h-8 rounded-full bg-brand-dark border-2 border-brand-blue group-hover:border-brand-orange transition-colors duration-300 z-10 shadow-lg shadow-brand-dark">
                    <span className="text-[10px] font-mono font-bold text-white group-hover:text-brand-orange transition-colors">
                      {item.step}
                    </span>
                  </div>

                  <div className="bg-brand-card/30 border border-white/5 hover:border-white/10 p-6 rounded-xl hover:bg-brand-card/60 transition-all duration-300">
                    <h3 className="font-display font-bold text-lg sm:text-xl mb-2 text-white group-hover:text-brand-blue transition-colors flex items-center gap-2">
                      {item.title}
                    </h3>
                    <p className="text-brand-gray text-sm leading-relaxed max-w-3xl">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* ========================================================
            7. HUMANIZAÇÃO (CONHEÇA O FUNDADOR)
           ======================================================== */}
        <section className="py-20 border-t border-white/5 max-w-7xl mx-auto px-6 md:px-12" id="founder">
          <div className="bg-brand-card border border-white/5 rounded-3xl p-8 md:p-14 relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center relative z-10">
              
              {/* Left Column: Stylized avatar */}
              <div className="lg:col-span-4 flex flex-col items-center sm:items-start text-center sm:text-left gap-4">
                
                <div className="relative w-36 h-36 rounded-2xl bg-brand-dark border-2 border-brand-blue/40 p-1 flex items-center justify-center shadow-2xl">
                  <div className="w-full h-full rounded-xl bg-gradient-to-tr from-brand-blue via-blue-900 to-brand-orange/40 flex items-center justify-center font-display font-extrabold text-4xl text-white tracking-widest relative overflow-hidden">
                    D
                    <div className="absolute bottom-2 left-0 right-0 text-center text-[10px] font-mono uppercase tracking-wider text-white/60">
                      Fundador
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-display font-extrabold text-2xl text-white">Douglas</h3>
                  <p className="text-xs text-brand-blue uppercase tracking-widest font-semibold mt-1">Estrategista Comercial de Negócios Locais</p>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-[10px] text-emerald-400 font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Estrategista online agora
                </div>
              </div>

              {/* Right Column: Human Direct Copywriting */}
              <div className="lg:col-span-8">
                <span className="text-xs text-brand-orange uppercase tracking-wider font-display font-semibold block mb-3 text-left">
                  Quem está por trás da DJNS Performance?
                </span>
                
                <div className="space-y-4 text-brand-gray text-base sm:text-lg leading-relaxed text-left">
                  <p className="font-display font-medium text-white text-xl">Olá!</p>
                  <p>
                    Sou <strong className="text-white">Douglas</strong>, fundador da DJNS Performance.
                  </p>
                  <p>
                    Ajudo empresas locais a conquistarem mais clientes utilizando campanhas inteligentes no Google e Meta Ads.
                  </p>
                  <p className="text-white font-medium">
                    Meu foco não é gerar cliques ou curtidas vazias. É gerar oportunidades reais de venda e mais faturamento para o seu negócio local.
                  </p>
                  <p>
                    Você falará diretamente comigo durante todo o projeto. Sem intermediários. Sem atendentes robotizados. Sem enrolação.
                  </p>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            8. PROVA DE CREDIBILIDADE (NOSSO COMPROMISSO DE TRANSPARÊNCIA)
           ======================================================== */}
        <section className="py-20 border-t border-white/5 bg-brand-card/15 animate-fade-in" id="commitment">
          <div className="max-w-7xl mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              
              <div className="lg:col-span-7 text-left">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-full text-[10px] font-semibold uppercase tracking-wider font-display mb-4">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Transparência Absoluta
                </span>
                
                <h2 className="font-display text-3xl font-extrabold tracking-tight mb-6">
                  Nosso compromisso.
                </h2>

                <div className="space-y-4 text-brand-gray text-base leading-relaxed">
                  <p>
                    Estamos construindo nossos primeiros grandes cases. Por isso cada projeto recebe atenção máxima.
                  </p>
                  <p>
                    Utilizamos estratégias modernas de segmentação, análise de dados, otimização contínua e acompanhamento próximo para entregar resultados consistentes.
                  </p>
                  <p className="text-white font-semibold">
                    Nosso objetivo é construir parcerias de longo prazo.
                  </p>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-1 gap-4 text-left">
                <div className="bg-brand-card border border-white/5 p-6 rounded-xl flex items-start gap-4">
                  <div className="p-2 bg-brand-blue/10 text-brand-blue rounded-lg">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-white mb-1">Atenção Dedicada</h4>
                    <p className="text-brand-gray text-xs leading-relaxed">Foco estratégico em poucos clientes para garantir entrega de alto nível e sem conflitos.</p>
                  </div>
                </div>

                <div className="bg-brand-card border border-white/5 p-6 rounded-xl flex items-start gap-4">
                  <div className="p-2 bg-brand-orange/10 text-brand-orange rounded-lg">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-sm text-white mb-1">Acompanhamento de ROI</h4>
                    <p className="text-brand-gray text-xs leading-relaxed font-medium text-brand-gray">Foco exclusivo em encher sua agenda e trazer faturamento no seu caixa comercial.</p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* ========================================================
            8.1 GARANTIA DE TRANSPARÊNCIA (SEGURANÇA E ALTO IMPACTO)
           ======================================================== */}
        <section className="py-20 border-t border-white/5 bg-brand-dark/50 relative" id="warranty">
          <div className="max-w-4xl mx-auto px-6">
            <motion.div 
              className="relative bg-gradient-to-tr from-brand-card to-brand-card/75 border-2 border-brand-orange/30 rounded-3xl p-8 md:p-12 text-center overflow-hidden shadow-2xl"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              {/* Decorative radial blur */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-orange/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-brand-blue/5 rounded-full blur-3xl pointer-events-none" />

              <div className="relative z-10 flex flex-col items-center">
                <div className="p-4 bg-brand-orange/10 border border-brand-orange/20 rounded-2xl text-brand-orange w-fit mb-6">
                  <Shield className="w-8 h-8 text-brand-orange" />
                </div>
                
                <span className="text-xs text-brand-orange font-mono font-bold uppercase tracking-widest block mb-2">
                  Transparência & Otimização
                </span>
                
                <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-white mb-4">
                  Trabalho focado em performance real.
                </h2>
                
                <p className="text-brand-gray text-sm sm:text-base leading-relaxed max-w-2xl mb-8">
                  Trabalhamos com transparência, acompanhamento constante e otimização contínua para buscar o melhor desempenho possível das campanhas. Nosso compromisso é com a clareza técnica e com a busca incessante por resultados reais para o seu negócio local, sem falsas promessas de enriquecimento rápido ou vendas automáticas garantidas.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full border-t border-white/5 mt-4 pt-8 text-left">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Zero Promessas Vazias</h4>
                      <p className="text-brand-gray text-xs mt-1">Sua conta de anúncios será guiada por métricas comerciais reais, e não por curtidas sem valor.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Monitoramento Próximo</h4>
                      <p className="text-brand-gray text-xs mt-1">Douglas analisa e refina suas campanhas semanalmente para otimizar os investimentos.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-white uppercase tracking-wider">Foco na Sua Agenda</h4>
                      <p className="text-brand-gray text-xs mt-1">Nosso foco diário é reduzir o custo por clique e maximizar mensagens de clientes no seu WhatsApp.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ========================================================
            9. CTA FINAL (FOCO EM CONVERSÃO COM URGÊNCIA)
           ======================================================== */}
        <section className="py-20 border-t border-white/5 max-w-7xl mx-auto px-6 md:px-12" id="final-cta">
          <motion.div 
            className="bg-gradient-cta border border-white/10 rounded-3xl p-8 md:p-16 text-center relative overflow-hidden shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Background glows */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue/10 rounded-full blur-[120px] pointer-events-none" />

            <div className="relative z-10 max-w-2xl mx-auto">
              
              {/* Regional scarcity bullet */}
              <span className="inline-flex items-center gap-1.5 bg-brand-orange/10 border border-brand-orange/20 text-brand-orange rounded-full px-4 py-1.5 text-xs font-semibold tracking-wider uppercase mb-6 font-display animate-pulse">
                <Users className="w-3.5 h-3.5" />
                Vaga Exclusiva p/ seu Bairro
              </span>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 leading-[1.2]">
                Pronto para atrair mais clientes para sua empresa?
              </h2>

              <p className="text-white/85 text-xs sm:text-sm md:text-base mb-8 max-w-xl mx-auto leading-relaxed font-semibold text-brand-gray bg-white/5 p-4 rounded-xl border border-white/5">
                ⚠ <strong>Atenção:</strong> Atendemos um número limitado de empresas por região para evitar conflito de interesses entre clientes concorrentes. Solicite seu diagnóstico hoje mesmo para garantir o seu bairro.
              </p>

              <p className="text-white/90 text-sm sm:text-base md:text-lg mb-8 max-w-lg mx-auto leading-relaxed">
                Solicite um diagnóstico gratuito e descubra onde sua empresa está perdendo oportunidades todos os dias.
              </p>

              {/* Huge CTA Button */}
              <button 
                onClick={() => triggerWhatsApp("Olá Douglas! Quero garantir a vaga da minha região e solicitar meu diagnóstico gratuito.")}
                className="w-full sm:w-auto px-10 py-5 bg-white text-brand-blue hover:bg-slate-100 font-display font-extrabold text-base sm:text-lg rounded-xl hover:shadow-2xl hover:shadow-white/20 transform hover:-translate-y-0.5 transition-all duration-200 flex items-center justify-center gap-3 mx-auto cursor-pointer"
                id="btn-final-cta"
              >
                Quero meu Diagnóstico Gratuito
                <MessageSquare className="w-5 h-5 text-brand-orange fill-brand-orange/10 animate-bounce" />
              </button>

              {/* Subbullets */}
              <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 mt-6 text-white/80 text-xs sm:text-sm font-semibold">
                <span className="flex items-center gap-1.5">✔ Resposta rápida</span>
                <span className="flex items-center gap-1.5">✔ Atendimento personalizado</span>
                <span className="flex items-center gap-1.5">✔ Sem compromisso</span>
              </div>
            </div>
          </motion.div>
        </section>

        {/* ========================================================
            9.1 PERGUNTAS FREQUENTES (FAQ - EXCELÊNCIA EM OBJEÇÕES)
           ======================================================== */}
        <section className="py-20 border-t border-white/5 bg-brand-card/10 relative" id="faq">
          <div className="max-w-4xl mx-auto px-6">
            
            <div className="text-center mb-16">
              <span className="text-xs text-brand-blue uppercase tracking-wider font-display font-semibold block mb-3">
                Dúvidas Comuns Respondidas
              </span>
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-white">
                Perguntas Frequentes
              </h2>
              <p className="text-brand-gray text-sm mt-3">
                Esclarecemos os principais pontos para você iniciar com total tranquilidade.
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "Preciso investir muito?",
                  a: "Não. O investimento depende exclusivamente do seu objetivo comercial e do mercado onde atua. Desenvolvemos estratégias flexíveis para buscar o melhor retorno possível dentro do seu planejamento de verba."
                },
                {
                  q: "Em quanto tempo aparecem resultados?",
                  a: "Depende bastante do seu segmento e da concorrência na região de Ipatinga, mas as campanhas começam a gerar dados, impressões e cliques qualificados quase que imediatamente logo após a ativação dos anúncios."
                },
                {
                  q: "Preciso ter site?",
                  a: "Não. Embora ter um site seja uma excelente vitrine, também trabalhamos com campanhas de alta performance direcionadas diretamente para o seu WhatsApp Comercial ou desenvolvemos landing pages de alta conversão para seu negócio local."
                }
              ].map((faq, idx) => (
                <div 
                  key={idx} 
                  className="bg-brand-card border border-white/5 rounded-2xl overflow-hidden transition-all duration-300 hover:border-white/10"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                    className="w-full flex justify-between items-center p-6 text-left focus:outline-none cursor-pointer group"
                  >
                    <span className="font-display font-bold text-white text-sm sm:text-base md:text-lg group-hover:text-brand-blue transition-colors">
                      {faq.q}
                    </span>
                    <span className="p-2 bg-white/5 group-hover:bg-brand-blue/10 rounded-lg text-brand-gray group-hover:text-brand-blue transition-all">
                      {openFaq === idx ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>
                  
                  <AnimatePresence initial={false}>
                    {openFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        <div className="px-6 pb-6 pt-2 border-t border-white/5 text-brand-gray text-xs sm:text-sm leading-relaxed text-left">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

          </div>
        </section>
        
      </main>

      {/* 10. Footer */}
      <footer className="border-t border-white/5 bg-brand-card/30 py-16 text-brand-gray relative">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-12 border-b border-white/5">
            {/* Column 1: Brand & Desc */}
            <div className="md:col-span-5 text-left">
              <span className="font-display font-extrabold text-xl text-white tracking-tight block mb-4">
                DJNS<span className="text-brand-blue">PERFORMANCE</span>
              </span>
              <p className="text-sm text-brand-gray max-w-sm leading-relaxed mb-6">
                Especialistas em gestão de tráfego pago para negócios locais em Ipatinga e Vale do Aço. Colocamos sua marca no radar de quem quer comprar.
              </p>
              
              {/* Social Networks Row */}
              <div className="flex gap-4">
                <a 
                  href="https://www.instagram.com/djnsperformance" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-3 bg-white/5 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-pink-500 rounded-xl text-brand-gray hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                  title="Siga no Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a 
                  href="https://www.facebook.com/djnsperformance" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-3 bg-white/5 hover:bg-blue-600 rounded-xl text-brand-gray hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                  title="Siga no Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a 
                  href={getWhatsAppLink()} 
                  target="_blank" 
                  rel="noreferrer" 
                  className="p-3 bg-white/5 hover:bg-emerald-600 rounded-xl text-brand-gray hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                  title="Fale no WhatsApp"
                >
                  <MessageSquare className="w-5 h-5" />
                </a>
                <a 
                  href="mailto:djnsperformance@gmail.com" 
                  className="p-3 bg-white/5 hover:bg-brand-blue rounded-xl text-brand-gray hover:text-white transition-all duration-300 transform hover:-translate-y-1"
                  title="Envie um E-mail"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="md:col-span-3 text-left">
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Acesso Rápido</h4>
              <ul className="space-y-2.5 text-sm">
                <li><button onClick={() => scrollToSection("hero")} className="hover:text-white transition-colors cursor-pointer text-brand-gray text-left">Início</button></li>
                <li><button onClick={() => scrollToSection("problems")} className="hover:text-white transition-colors cursor-pointer text-brand-gray text-left">O Problema</button></li>
                <li><button onClick={() => scrollToSection("ideal-for")} className="hover:text-white transition-colors cursor-pointer text-brand-gray text-left">Segmentos Alvo</button></li>
                <li><button onClick={() => scrollToSection("method")} className="hover:text-white transition-colors cursor-pointer text-brand-gray text-left">O Método DJNS™</button></li>
                <li><button onClick={() => scrollToSection("faq")} className="hover:text-white transition-colors cursor-pointer text-brand-gray text-left">Dúvidas Frequentes (FAQ)</button></li>
              </ul>
            </div>

            {/* Column 3: Legal & Support */}
            <div className="md:col-span-4 text-left">
              <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider mb-4">Legal e Suporte</h4>
              <ul className="space-y-3 text-sm">
                <li>
                  <button 
                    onClick={() => setIsPrivacyOpen(true)}
                    className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-brand-gray text-left"
                  >
                    <FileText className="w-4 h-4 text-brand-blue" />
                    Política de Privacidade
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => setIsTermsOpen(true)}
                    className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer text-brand-gray text-left"
                  >
                    <FileText className="w-4 h-4 text-brand-orange" />
                    Termos de Uso
                  </button>
                </li>
                <li>
                  <div className="text-xs text-brand-gray/80 mt-4 font-mono bg-white/5 p-3 rounded-lg border border-white/5">
                    <p className="font-bold text-white mb-1">Contato Direto:</p>
                    <p>djnsperformance@gmail.com</p>
                    <p className="mt-1">Ipatinga, Minas Gerais, Brasil</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8 text-xs text-center sm:text-left">
            <p className="text-brand-gray/80">
              © {new Date().getFullYear()} DJNS Performance. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsConfigOpen(true)}
                className="text-xs flex items-center gap-1.5 hover:text-white transition-colors py-1.5 px-3 bg-white/5 hover:bg-white/10 rounded-lg border border-white/5 cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 animate-spin-slow" />
                Configurar Link
              </button>
            </div>
          </div>

        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              className="absolute inset-0 bg-brand-dark/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPrivacyOpen(false)}
            />
            <motion.div 
              className="relative w-full max-w-2xl bg-brand-card border border-white/10 p-6 sm:p-10 rounded-3xl max-h-[85vh] overflow-y-auto shadow-2xl z-10 text-left"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2 text-white">
                  <Shield className="w-5 h-5 text-brand-blue" />
                  <h3 className="font-display font-bold text-xl">Política de Privacidade</h3>
                </div>
                <button 
                  onClick={() => setIsPrivacyOpen(false)}
                  className="p-1.5 text-brand-gray hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-brand-gray text-xs sm:text-sm leading-relaxed">
                <p className="font-semibold text-white">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
                <p>
                  Na <strong>DJNS Performance</strong>, valorizamos a privacidade dos nossos usuários. Esta Política de Privacidade descreve como coletamos, usamos, armazenamos e protegemos as informações fornecidas através da nossa landing page.
                </p>
                
                <h4 className="font-display font-bold text-white text-base mt-6">1. Coleta de Informações</h4>
                <p>
                  As únicas informações coletadas diretamente por este site são aquelas enviadas voluntariamente por você ao interagir com as configurações de WhatsApp ou ao iniciar uma conversa com o nosso time técnico. Nós não armazenamos dados de conversas em nossos próprios servidores.
                </p>

                <h4 className="font-display font-bold text-white text-base mt-6">2. Cookies e Rastreamento</h4>
                <p>
                  Utilizamos cookies e tecnologias similares do Google Analytics, Meta Pixel e Google Ads para analisar o comportamento dos usuários, otimizar campanhas de publicidade paga e melhorar a experiência de navegação geral. Você pode desativar o rastreamento ajustando as configurações do seu navegador.
                </p>

                <h4 className="font-display font-bold text-white text-base mt-6">3. Armazenamento de Preferências</h4>
                <p>
                  As configurações personalizadas de número de WhatsApp e mensagens que você altera nas ferramentas de configuração deste site são salvas localmente no seu navegador através da API de <strong>localStorage</strong>. Nenhum dado é repassado a terceiros sem seu consentimento explícito.
                </p>

                <h4 className="font-display font-bold text-white text-base mt-6">4. Contato</h4>
                <p>
                  Para dúvidas ou solicitações de esclarecimentos em relação à privacidade, entre em contato via e-mail: <strong>djnsperformance@gmail.com</strong>.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 text-right">
                <button 
                  onClick={() => setIsPrivacyOpen(false)}
                  className="px-6 py-2.5 bg-brand-blue hover:bg-blue-700 text-white font-display font-bold text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Entendi
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Terms of Use Modal */}
      <AnimatePresence>
        {isTermsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              className="absolute inset-0 bg-brand-dark/95 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsTermsOpen(false)}
            />
            <motion.div 
              className="relative w-full max-w-2xl bg-brand-card border border-white/10 p-6 sm:p-10 rounded-3xl max-h-[85vh] overflow-y-auto shadow-2xl z-10 text-left"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
            >
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
                <div className="flex items-center gap-2 text-white">
                  <FileText className="w-5 h-5 text-brand-orange" />
                  <h3 className="font-display font-bold text-xl">Termos de Uso</h3>
                </div>
                <button 
                  onClick={() => setIsTermsOpen(false)}
                  className="p-1.5 text-brand-gray hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-brand-gray text-xs sm:text-sm leading-relaxed">
                <p className="font-semibold text-white">Última atualização: {new Date().toLocaleDateString('pt-BR')}</p>
                <p>
                  Ao acessar o site <strong>DJNS Performance</strong>, você concorda em cumprir e respeitar estes Termos de Uso. Caso não concorde com algum dos pontos, sugerimos descontinuar a navegação.
                </p>

                <h4 className="font-display font-bold text-white text-base mt-6">1. Escopo das Informações</h4>
                <p>
                  O conteúdo contido neste site possui caráter informativo e promocional de prestação de serviços de gestão de tráfego pago para negócios locais em Ipatinga e região. Os resultados de vendas e retornos de publicidade dependem do mercado, concorrência, qualidade de atendimento do cliente e investimento orçamentário.
                </p>

                <h4 className="font-display font-bold text-white text-base mt-6">2. Propriedade Intelectual</h4>
                <p>
                  O Método DJNS™, logotipo, textos, ilustrações técnicas interativas (como o Radar de Presença) e estruturas do site são de propriedade intelectual exclusiva da <strong>DJNS Performance</strong>. A reprodução não autorizada do material intelectual deste site é expressamente proibida.
                </p>

                <h4 className="font-display font-bold text-white text-base mt-6">3. Uso de Ferramentas</h4>
                <p>
                  A ferramenta de configuração de WhatsApp e simulação de links presente no site é fornecida "como está" para facilitar o teste de canais de conversão rápida. O usuário é inteiramente responsável pelo bom uso das mensagens enviadas.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/5 text-right">
                <button 
                  onClick={() => setIsTermsOpen(false)}
                  className="px-6 py-2.5 bg-brand-orange hover:bg-orange-600 text-white font-display font-bold text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Aceito os Termos
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Dynamic WhatsApp Config Drawer Modal */}
      <AnimatePresence>
        {isConfigOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div 
              className="absolute inset-0 bg-brand-dark/80 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsConfigOpen(false)}
            />

            {/* Drawer Content */}
            <motion.div 
              className="relative w-full max-w-md bg-brand-card border-l border-white/10 p-6 sm:p-8 flex flex-col justify-between h-full shadow-2xl z-10 text-left"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2 text-white">
                    <Settings className="w-5 h-5 text-brand-blue" />
                    <h3 className="font-display font-bold text-lg">Configurar Conversão</h3>
                  </div>
                  <button 
                    onClick={() => setIsConfigOpen(false)}
                    className="p-1 text-brand-gray hover:text-white rounded-lg hover:bg-white/5 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <p className="text-brand-gray text-xs leading-relaxed mb-6">
                  Personalize o número do WhatsApp e a mensagem de boas-vindas padrão de todos os botões do site. Suas alterações ficam salvas no navegador!
                </p>

                <div className="space-y-4">
                  {/* Phone input */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-gray mb-1.5">
                      Número do WhatsApp (com DDI e DDD)
                    </label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-brand-gray absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input 
                        type="text" 
                        defaultValue={phoneNumber}
                        onChange={(e) => {
                          const cleanVal = e.target.value.replace(/[^0-9]/g, "");
                          e.target.value = cleanVal;
                        }}
                        id="config-phone-input"
                        placeholder="Ex: 5511999999999"
                        className="w-full bg-brand-dark border border-white/10 rounded-xl py-3 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-brand-blue font-mono"
                      />
                    </div>
                    <span className="text-[10px] text-brand-gray/80 mt-1 block font-mono">Apenas números. Comece com 55 (Brasil).</span>
                  </div>

                  {/* Message input */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-brand-gray mb-1.5">
                      Mensagem de Boas-vindas Padrão
                    </label>
                    <textarea 
                      id="config-msg-input"
                      rows={4}
                      defaultValue={customMessage}
                      placeholder="Ex: Olá! Vi sua página e gostaria de agendar uma consulta."
                      className="w-full bg-brand-dark border border-white/10 rounded-xl p-3.5 text-sm text-white focus:outline-none focus:border-brand-blue leading-relaxed resize-none"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3 pt-6 border-t border-white/5">
                <button 
                  onClick={() => {
                    const phoneEl = document.getElementById("config-phone-input") as HTMLInputElement;
                    const msgEl = document.getElementById("config-msg-input") as HTMLTextAreaElement;
                    if (phoneEl && msgEl) {
                      saveConfiguration(phoneEl.value, msgEl.value);
                    }
                  }}
                  className="w-full py-3.5 bg-brand-blue hover:bg-blue-700 text-white font-display font-bold rounded-xl shadow-lg hover:shadow-brand-blue/20 transition-all duration-200 cursor-pointer"
                >
                  Salvar Alterações
                </button>
                <button 
                  onClick={() => setIsConfigOpen(false)}
                  className="w-full py-3 bg-white/5 hover:bg-white/10 text-brand-gray hover:text-white rounded-xl text-sm transition-colors cursor-pointer"
                >
                  Cancelar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
