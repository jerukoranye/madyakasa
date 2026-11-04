import React, { useState, useEffect, useRef } from 'react';
import { useAOS } from './hooks/useAOS';
import { 
  Sparkles, 
  MessageSquare, 
  Maximize2, 
  Download, 
  Play, 
  Pause, 
  Volume2, 
  VolumeX, 
  RotateCcw, 
  Send, 
  CheckCircle2, 
  Flame,
  Award,
  ChevronRight
} from 'lucide-react';

export default function App() {
  useAOS();

  // State for interactive community poll in Manifesto
  const [pollVotes, setPollVotes] = useState({
    yes: 1284,
    absolutely: 2450,
  });
  const [hasVoted, setHasVoted] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [shoutouts, setShoutouts] = useState<Array<{ name: string; text: string; time: string }>>([
    { name: 'Putu Arya (Trisma XI)', text: 'Generasi muda bukan sekadar penerus, tapi penentu arah!', time: '10 menit lalu' },
    { name: 'Kadek Sinta (Alumni \'24)', text: 'Bangga banget sama Madyakasa SMA Negeri 3 Denpasar! Terus berkarya 🔥', time: '1 jam lalu' },
    { name: 'Nyoman Bagus', text: 'Be Trendsetter Not A Follower! Karya Mas Bahlil keren abis.', time: '3 jam lalu' },
  ]);
  const [newAuthor, setNewAuthor] = useState('');
  const [newShoutout, setNewShoutout] = useState('');

  // Gallery modal state
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Video state
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoError, setVideoError] = useState(false);
  const [videoSrc, setVideoSrc] = useState('assets/videos/video1.mp4');

  // Load votes from localStorage
  useEffect(() => {
    const savedVotes = localStorage.getItem('madyakasa_poll_votes');
    if (savedVotes) {
      try {
        setPollVotes(JSON.parse(savedVotes));
      } catch {
        // ignore
      }
    }
    const savedVoted = localStorage.getItem('madyakasa_has_voted');
    if (savedVoted) {
      setHasVoted(true);
    }
  }, []);

  const handleVote = (type: 'yes' | 'absolutely') => {
    if (hasVoted) return;
    const updated = {
      ...pollVotes,
      [type]: pollVotes[type] + 1,
    };
    setPollVotes(updated);
    setHasVoted(true);
    setSelectedOption(type);
    localStorage.setItem('madyakasa_poll_votes', JSON.stringify(updated));
    localStorage.setItem('madyakasa_has_voted', 'true');
  };

  const handleAddShoutout = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newShoutout.trim()) return;
    const authorName = newAuthor.trim() || 'Pelajar Indonesia';
    const entry = {
      name: authorName,
      text: newShoutout.trim(),
      time: 'Baru saja',
    };
    setShoutouts([entry, ...shoutouts]);
    setNewShoutout('');
    setNewAuthor('');
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleResetVideo = () => {
    if (!videoRef.current) return;
    videoRef.current.currentTime = 0;
    videoRef.current.play();
    setIsPlaying(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF6ED] text-[#1A1816]">
      {/* Top Banner / Ticker */}
      <div className="bg-[#1A1816] text-[#FFD23F] px-4 py-2 text-xs font-bold tracking-widest uppercase overflow-hidden whitespace-nowrap flex items-center justify-between border-b-2 border-[#1A1816]">
        <div className="flex items-center gap-6 animate-pulse">
          <span>⚡ SMA NEGERI 3 DENPASAR</span>
          <span>•</span>
          <span>MADYAKASA ON STYLE</span>
          <span>•</span>
          <span>BE TRENDSETTER NOT A FOLLOWER</span>
          <span>•</span>
          <span>REDEFINING TEENAGE POWER</span>
        </div>
        <div className="hidden md:flex items-center gap-2 text-white/80 text-xs">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
          <span>TRISMA DENPASAR EXHIBITION</span>
        </div>
      </div>

      {/* Navigation Bar */}
      <header className="sticky top-0 z-40 bg-[#FAF6ED]/95 backdrop-blur-md border-b-2 border-[#1A1816] px-4 md:px-8 py-4 transition-all">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-lg bg-[#D9381E] border-2 border-[#1A1816] flex items-center justify-center font-lilita text-white text-xl shadow-brutal-sm group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform">
              M
            </div>
            <div>
              <span className="font-lilita text-xl md:text-2xl tracking-wide block leading-none text-[#1A1816]">
                MADYAKASA
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#D9381E]">
                SMA NEGERI 3 DENPASAR
              </span>
            </div>
          </a>

          <nav className="flex items-center gap-2 md:gap-6 text-sm font-bold">
            <a 
              href="#hero" 
              className="px-3 py-1.5 rounded-md hover:bg-[#FFD23F] hover:text-[#1A1816] transition-colors"
            >
              Beranda
            </a>
            <a 
              href="#gallery" 
              className="px-3 py-1.5 rounded-md hover:bg-[#FFD23F] hover:text-[#1A1816] transition-colors"
            >
              Galeri Foto
            </a>
            <a 
              href="#video" 
              className="px-3 py-1.5 rounded-md hover:bg-[#FFD23F] hover:text-[#1A1816] transition-colors"
            >
              Video Dokumentasi
            </a>
            <a 
              href="#manifesto" 
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#D9381E] text-white rounded-md border-2 border-[#1A1816] shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-xs uppercase tracking-wider"
            >
              <Flame className="w-3.5 h-3.5 text-[#FFD23F]" />
              Suara Remaja
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* HERO SECTION */}
        <section id="hero" className="hero relative overflow-hidden py-16 md:py-24 border-b-2 border-[#1A1816]">
          {/* Halftone Pattern Accent */}
          <div className="absolute inset-0 bg-halftone opacity-5 pointer-events-none"></div>

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10 hero-copy">
            {/* Eyebrow */}
            <div data-aos="fade-down" data-aos-duration="800" className="inline-block mb-4">
              <span className="eyebrow inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD23F] text-[#1A1816] font-bold text-sm md:text-base border-2 border-[#1A1816] shadow-brutal-sm tracking-wide">
                <Award className="w-4 h-4 text-[#D9381E]" />
                SMA Negeri 3 Denpasar
              </span>
            </div>

            {/* H1 Main Title */}
            <h1 
              data-aos="fade-down" 
              data-aos-duration="1000"
              className="font-lilita text-5xl sm:text-7xl md:text-8xl text-[#1A1816] tracking-tight mb-4 drop-shadow-[4px_4px_0px_#D9381E]"
            >
              Madyakasa on Style
            </h1>

            {/* Tagline */}
            <p 
              data-aos="fade-up" 
              data-aos-delay="200"
              className="tagline font-fraunces italic font-semibold text-2xl sm:text-3xl md:text-4xl text-[#D9381E] mb-10"
            >
              “Be Trendsetter Not A Follower”
            </p>

            {/* Manifesto & Description */}
            <div 
              data-aos="fade-up" 
              data-aos-delay="400"
              className="desc max-w-2xl mx-auto bg-white/90 backdrop-blur-sm border-2 border-[#1A1816] rounded-2xl p-6 md:p-8 shadow-brutal text-left space-y-5"
            >
              <p className="text-base sm:text-lg leading-relaxed text-[#2D2A26]">
                Masih kerap kali, menjadi muda diidentikkan dengan &apos;mengekor&apos;. Padahal,{' '}
                <em className="font-fraunces font-bold text-[#D9381E] underline decoration-[#FFD23F] decoration-4 underline-offset-2">
                  redefining teenage power
                </em>{' '}
                adalah tentang keberanian mendefinisikan kekuatan remaja untuk membawa perubahan.
              </p>

              {/* Prompt box */}
              <div className="prompt bg-[#FAF6ED] border-2 border-dashed border-[#D9381E] rounded-xl p-4 text-center">
                <p className="text-base sm:text-xl font-bold text-[#1A1816] flex items-center justify-center flex-wrap gap-2">
                  <span className="text-2xl">🗣️</span> 
                  <span className="font-lilita tracking-wide text-[#D9381E] sm:text-2xl">
                    Percayakah kamu remaja dapat membawa perubahan?
                  </span> 
                  <span className="text-2xl">💬</span>
                </p>

                {/* Interactive response options */}
                <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => handleVote('yes')}
                    disabled={hasVoted}
                    className={`px-4 py-2 rounded-lg font-bold text-sm border-2 border-[#1A1816] transition-all flex items-center gap-2 ${
                      selectedOption === 'yes'
                        ? 'bg-[#3B7A57] text-white shadow-none translate-x-0.5 translate-y-0.5'
                        : 'bg-white hover:bg-[#FFD23F] text-[#1A1816] shadow-brutal-sm'
                    } ${hasVoted ? 'cursor-default opacity-90' : 'cursor-pointer active:translate-x-0.5 active:translate-y-0.5'}`}
                  >
                    <span>🔥 Pasti Percaya!</span>
                    <span className="bg-[#1A1816]/10 px-2 py-0.5 rounded text-xs">
                      {pollVotes.yes}
                    </span>
                  </button>

                  <button
                    onClick={() => handleVote('absolutely')}
                    disabled={hasVoted}
                    className={`px-4 py-2 rounded-lg font-bold text-sm border-2 border-[#1A1816] transition-all flex items-center gap-2 ${
                      selectedOption === 'absolutely'
                        ? 'bg-[#D9381E] text-white shadow-none translate-x-0.5 translate-y-0.5'
                        : 'bg-[#FFD23F] hover:bg-[#ffe066] text-[#1A1816] shadow-brutal-sm'
                    } ${hasVoted ? 'cursor-default opacity-90' : 'cursor-pointer active:translate-x-0.5 active:translate-y-0.5'}`}
                  >
                    <span>🚀 100% Yakin!</span>
                    <span className="bg-[#1A1816]/10 px-2 py-0.5 rounded text-xs">
                      {pollVotes.absolutely}
                    </span>
                  </button>
                </div>

                {hasVoted && (
                  <p className="text-xs text-[#3B7A57] font-bold mt-3 flex items-center justify-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Suaramu tercatat! Kekuatan remaja ada di tangan kita.
                  </p>
                )}
              </div>

              <p className="text-base sm:text-lg leading-relaxed text-[#2D2A26]">
                Kami adalah <strong>Madyakasa</strong> dari <strong>SMA Negeri 3 Denpasar</strong>. Sekumpulan remaja yang mengiprahkan sayap, menembus batas, dan mengangkasa tinggi demi membawa perubahan nyata.
              </p>

              <div className="pt-2 flex flex-wrap gap-3">
                <a
                  href="#gallery"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#D9381E] text-white font-bold rounded-lg border-2 border-[#1A1816] shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm uppercase tracking-wide"
                >
                  Lihat Galeri Foto
                  <ChevronRight className="w-4 h-4" />
                </a>
                <a
                  href="#video"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white text-[#1A1816] font-bold rounded-lg border-2 border-[#1A1816] shadow-brutal-sm hover:bg-[#FAF6ED] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm uppercase tracking-wide"
                >
                  <Play className="w-4 h-4 text-[#D9381E] fill-current" />
                  Tonton Video
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section id="gallery" className="gallery py-16 md:py-24 border-b-2 border-[#1A1816] bg-[#FAF6ED]">
          <div className="max-w-5xl mx-auto px-6">
            <div className="text-center mb-12">
              <h2 
                data-aos="zoom-in"
                className="font-lilita text-4xl sm:text-5xl md:text-6xl text-[#1A1816] tracking-tight mb-3 inline-block relative"
              >
                Galeri Foto
                <span className="block h-2 bg-[#FFD23F] border border-[#1A1816] rounded-full mt-1"></span>
              </h2>
              <p className="text-[#68635B] font-medium text-sm sm:text-base max-w-lg mx-auto">
                Karya visual eksklusif Madyakasa — perpaduan seni, kritik sosial, dan keberanian berekspresi generasi muda Trisma Denpasar.
              </p>
            </div>

            {/* Gallery Card Container */}
            <div className="card-container flex flex-col md:flex-row items-center justify-center gap-8">
              {/* Featured Poster Card */}
              <div 
                data-aos="fade-right" 
                data-aos-duration="800"
                className="group relative max-w-md w-full bg-white border-3 border-[#1A1816] rounded-2xl p-4 shadow-brutal-lg transition-transform duration-300 hover:-translate-y-1"
              >
                {/* Vintage Badge Stamp */}
                <div className="absolute -top-3 -right-3 z-20 bg-[#D9381E] text-white text-xs font-lilita uppercase px-3 py-1.5 rounded-full border-2 border-[#1A1816] shadow-brutal-sm rotate-6">
                  Featured Art ★
                </div>

                {/* Poster Frame */}
                <div className="relative overflow-hidden rounded-xl border-2 border-[#1A1816] bg-[#1A1816]/5">
                  <img 
                    src="assets/images/PIC 1 - MAS BAHLIL.jpg" 
                    alt="Foto Mas Bahlil" 
                    className="w-full h-auto object-cover transform transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="p-3 bg-white text-[#1A1816] rounded-full border-2 border-[#1A1816] shadow-brutal-sm hover:bg-[#FFD23F] transition-all transform hover:scale-110"
                      title="Perbesar Gambar"
                    >
                      <Maximize2 className="w-5 h-5" />
                    </button>
                    <a
                      href="assets/images/PIC 1 - MAS BAHLIL.jpg"
                      download="PIC 1 - MAS BAHLIL.jpg"
                      className="p-3 bg-[#FFD23F] text-[#1A1816] rounded-full border-2 border-[#1A1816] shadow-brutal-sm hover:bg-white transition-all transform hover:scale-110"
                      title="Unduh Poster"
                    >
                      <Download className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                {/* Card Caption / Info */}
                <div className="mt-4 pt-3 border-t-2 border-dashed border-[#1A1816]/30 flex items-center justify-between">
                  <div>
                    <h3 className="font-lilita text-xl text-[#1A1816]">
                      PIC 1 - MAS BAHLIL
                    </h3>
                    <p className="text-xs text-[#68635B] font-semibold">
                      Karya Seni Zine &amp; Satire Sosial Madyakasa
                    </p>
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-3 py-1.5 bg-[#FFD23F] hover:bg-[#ffe066] text-[#1A1816] text-xs font-bold rounded-lg border-2 border-[#1A1816] shadow-brutal-sm"
                  >
                    Detail Karya
                  </button>
                </div>
              </div>

              {/* Curatorial Note / Context Panel */}
              <div 
                data-aos="fade-up" 
                data-aos-delay="200"
                className="max-w-md w-full bg-[#FAF6ED] border-2 border-[#1A1816] rounded-2xl p-6 shadow-brutal flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#3B7A57] text-white text-xs font-bold uppercase tracking-wider mb-4 border border-[#1A1816]">
                    <Sparkles className="w-3.5 h-3.5" />
                    Eksplorasi Gaya Remaja
                  </div>
                  <h3 className="font-lilita text-2xl text-[#1A1816] mb-3">
                    Bukan Sekadar Estetika, Melainkan Bersuara
                  </h3>
                  <p className="text-sm leading-relaxed text-[#4A463F] mb-4">
                    Karya <strong>PIC 1 - MAS BAHLIL</strong> memperlihatkan semangat pop-art jalanan khas anak muda Denpasar: perpaduan warna kontras, stiker satire, dan pesan berani.
                  </p>
                  <ul className="space-y-2 text-xs font-semibold text-[#2D2A26]">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#D9381E]"></span>
                      Visual Style: Vintage Comic &amp; Satirical Pop Sticker
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#FFD23F]"></span>
                      Institusi: SMA Negeri 3 Denpasar (Trisma)
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#3B7A57]"></span>
                      Tema: Be Trendsetter Not A Follower
                    </li>
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t-2 border-dashed border-[#1A1816]/20 flex items-center justify-between text-xs font-bold text-[#68635B]">
                  <span>Arsip Karya Madyakasa</span>
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="text-[#D9381E] hover:underline flex items-center gap-1"
                  >
                    Buka Preview Fullscreen →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* VIDEO DOCUMENTATION SECTION */}
        <section id="video" className="video-section py-16 md:py-24 border-b-2 border-[#1A1816] bg-[#1A1816] text-[#FAF6ED]">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <div 
              data-aos="flip-up" 
              data-aos-duration="1000"
              className="space-y-6"
            >
              {/* Section Header */}
              <div>
                <span className="inline-block px-3 py-1 bg-[#D9381E] text-white text-xs font-bold uppercase tracking-widest rounded-full mb-3 border border-white/20">
                  Motion &amp; Moments
                </span>
                <h2 className="font-lilita text-4xl sm:text-5xl md:text-6xl text-[#FFD23F] tracking-tight">
                  Video Dokumentasi
                </h2>
                <p className="text-white/70 max-w-md mx-auto text-sm sm:text-base mt-2">
                  Rekaman perjalanan inspiratif remaja SMA Negeri 3 Denpasar dalam menggapai mimpi dan menciptakan tren.
                </p>
              </div>

              {/* Video Player Container */}
              <div className="relative mx-auto max-w-[800px] w-full rounded-2xl overflow-hidden border-4 border-[#FAF6ED] bg-black shadow-[8px_8px_0px_#D9381E]">
                {/* HTML5 video element preserving exact original markup and source */}
                <video 
                  ref={videoRef}
                  controls 
                  width={800} 
                  autoPlay 
                  muted 
                  loop
                  playsInline
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                  onError={() => setVideoError(true)}
                  className="w-full h-auto aspect-video object-cover"
                >
                  <source src={videoSrc} type="video/mp4" />
                  Browser kamu tidak mendukung pemutaran video.
                </video>

                {/* Video status overlay if source has fallback or error */}
                {videoError && (
                  <div className="absolute inset-0 bg-[#1A1816]/90 flex flex-col items-center justify-center p-6 text-center text-white">
                    <div className="w-16 h-16 rounded-full bg-[#D9381E]/30 border-2 border-[#D9381E] flex items-center justify-center mb-3 text-2xl">
                      🎬
                    </div>
                    <h4 className="font-lilita text-xl text-[#FFD23F] mb-1">
                      Video Dokumentasi Madyakasa
                    </h4>
                    <p className="text-xs text-white/80 max-w-sm mb-4">
                      File <code className="bg-black/40 px-1 py-0.5 rounded text-[#FFD23F]">assets/videos/video1.mp4</code> sedang dalam proses rendering arsip atau siap kamu ganti dengan video dokumentasi Trisma pilihanmu.
                    </p>
                    
                    <div className="flex flex-wrap gap-2 justify-center">
                      <button
                        onClick={() => {
                          setVideoError(false);
                          // Demo sample video url
                          setVideoSrc('https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4');
                        }}
                        className="px-4 py-2 bg-[#FFD23F] text-[#1A1816] font-bold text-xs rounded-lg border-2 border-white shadow-brutal-sm hover:bg-white transition-all flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        Putar Sample Reel Dokumentasi
                      </button>
                      <button
                        onClick={() => {
                          setVideoError(false);
                          setVideoSrc('assets/videos/video1.mp4');
                        }}
                        className="px-3 py-2 bg-transparent text-white/70 hover:text-white text-xs font-semibold"
                      >
                        Coba Lagi Sumber Asli
                      </button>
                    </div>
                  </div>
                )}

                {/* Floating quick control badge */}
                <div className="absolute bottom-4 right-4 z-10 flex items-center gap-2 bg-[#1A1816]/80 backdrop-blur-sm p-1.5 rounded-lg border border-white/20">
                  <button
                    onClick={togglePlay}
                    className="p-1.5 hover:bg-white/20 rounded text-white transition-colors"
                    title={isPlaying ? "Jeda" : "Putar"}
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={toggleMute}
                    className="p-1.5 hover:bg-white/20 rounded text-white transition-colors"
                    title={isMuted ? "Aktifkan Suara" : "Bisukan"}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-red-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                  </button>
                  <button
                    onClick={handleResetVideo}
                    className="p-1.5 hover:bg-white/20 rounded text-white transition-colors"
                    title="Ulangi dari Awal"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 text-xs text-white/60 pt-2">
                <span>Format: MP4 (Full HD)</span>
                <span>•</span>
                <span>Auto-loop &amp; Muted Default</span>
                <span>•</span>
                <span>SMA Negeri 3 Denpasar</span>
              </div>
            </div>
          </div>
        </section>

        {/* MANIFESTO & COMMUNITY VOICE SECTION */}
        <section id="manifesto" className="py-16 md:py-20 border-b-2 border-[#1A1816] bg-[#FAF6ED]">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-10">
              <span className="font-lilita text-sm uppercase tracking-wider text-[#D9381E] bg-[#FFD23F] px-3 py-1 rounded-full border border-[#1A1816] shadow-brutal-sm">
                Voice of Madyakasa
              </span>
              <h2 className="font-lilita text-3xl sm:text-4xl text-[#1A1816] mt-3">
                Suara Remaja Pembawa Perubahan
              </h2>
              <p className="text-sm text-[#4A463F] mt-1">
                Kirimkan pesan dan semangatmu untuk seluruh pejuang muda Indonesia!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Form Input */}
              <div className="bg-white border-2 border-[#1A1816] rounded-2xl p-6 shadow-brutal">
                <h3 className="font-lilita text-xl text-[#1A1816] mb-3 flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#D9381E]" />
                  Tinggalkan Jejak &amp; Dukungan
                </h3>
                <form onSubmit={handleAddShoutout} className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1816] mb-1">
                      Nama / Identitas (Opsional)
                    </label>
                    <input 
                      type="text"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="Contoh: Budi (Siswa SMA) / Pemerhati Muda"
                      className="w-full px-3 py-2 text-sm rounded-lg border-2 border-[#1A1816] focus:outline-none focus:bg-[#FAF6ED]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#1A1816] mb-1">
                      Pesan atau Kata Semangat
                    </label>
                    <textarea 
                      rows={3}
                      value={newShoutout}
                      onChange={(e) => setNewShoutout(e.target.value)}
                      placeholder="Tuliskan pandanganmu tentang kekuatan remaja membawa perubahan..."
                      className="w-full px-3 py-2 text-sm rounded-lg border-2 border-[#1A1816] focus:outline-none focus:bg-[#FAF6ED]"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-[#D9381E] text-white font-bold rounded-lg border-2 border-[#1A1816] shadow-brutal-sm hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-sm uppercase tracking-wider flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Kirim Pesan Madyakasa
                  </button>
                </form>
              </div>

              {/* Feed of Youth Voices */}
              <div className="space-y-3">
                <div className="flex items-center justify-between pb-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#68635B]">
                    Komentar Terkini ({shoutouts.length})
                  </span>
                  <span className="text-xs font-bold text-[#3B7A57] flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#3B7A57] animate-ping"></span> Live
                  </span>
                </div>
                <div className="max-h-[340px] overflow-y-auto space-y-3 pr-1">
                  {shoutouts.map((item, idx) => (
                    <div 
                      key={idx}
                      className="bg-white border-2 border-[#1A1816] rounded-xl p-4 shadow-brutal-sm"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-sm text-[#1A1816]">
                          {item.name}
                        </span>
                        <span className="text-[10px] text-[#68635B] font-medium">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-xs text-[#4A463F] leading-relaxed">
                        &ldquo;{item.text}&rdquo;
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#1A1816] text-[#FAF6ED] border-t-2 border-[#1A1816] py-10 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div>
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <span className="font-lilita text-2xl text-[#FFD23F]">Madyakasa on Style</span>
              <span className="text-xs px-2 py-0.5 bg-[#D9381E] text-white font-bold rounded">Trisma</span>
            </div>
            <p className="text-xs text-white/60 max-w-sm">
              SMA Negeri 3 Denpasar, Bali. Gerakan kepemudaan dan kreativitas tanpa batas: <em className="italic text-white/80">Be Trendsetter Not A Follower</em>.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 text-xs font-bold">
            <span className="text-white/40">© {new Date().getFullYear()} Madyakasa Trisma Denpasar</span>
            <div className="flex items-center gap-3">
              <a 
                href="#hero" 
                className="text-[#FFD23F] hover:underline"
              >
                Kembali ke Atas ↑
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Fullscreen Photo Lightbox Modal */}
      {isModalOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsModalOpen(false)}
        >
          <div 
            className="relative bg-white border-3 border-[#1A1816] rounded-2xl max-w-2xl w-full p-6 shadow-brutal-lg max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b-2 border-[#1A1816] mb-4">
              <div>
                <h3 className="font-lilita text-2xl text-[#1A1816]">
                  PIC 1 - MAS BAHLIL.jpg
                </h3>
                <p className="text-xs font-semibold text-[#D9381E]">
                  SMA Negeri 3 Denpasar — Madyakasa on Style
                </p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="w-8 h-8 rounded-full bg-[#1A1816] text-white font-bold flex items-center justify-center hover:bg-[#D9381E] transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="rounded-xl overflow-hidden border-2 border-[#1A1816] mb-4 bg-[#FAF6ED]">
              <img 
                src="assets/images/PIC 1 - MAS BAHLIL.jpg" 
                alt="Foto Mas Bahlil" 
                className="w-full max-h-[60vh] object-contain mx-auto"
              />
            </div>

            <div className="flex items-center justify-between text-xs">
              <div className="text-[#68635B]">
                <p className="font-semibold">Format: JPG High Resolution</p>
                <p>Karya Pop-Art &amp; Zine Madyakasa</p>
              </div>
              <a
                href="assets/images/PIC 1 - MAS BAHLIL.jpg"
                download="PIC 1 - MAS BAHLIL.jpg"
                className="px-4 py-2 bg-[#FFD23F] text-[#1A1816] font-bold rounded-lg border-2 border-[#1A1816] shadow-brutal-sm hover:bg-white transition-all flex items-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                Unduh Gambar Penuh
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
