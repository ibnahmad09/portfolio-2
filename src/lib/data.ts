// Skills data - Updated to match reference design
export const skills = [
  { 
    name: "HTML/CSS", 
    icon: "🌐",
    category: "frontend"
  },
  { 
    name: "JavaScript", 
    icon: "⚡",
    category: "frontend"
  },
  { 
    name: "React", 
    icon: "⚛️",
    category: "frontend"
  },
  { 
    name: "Laravel", 
    icon: "🔺",
    category: "backend"
  },
  { 
    name: "PHP", 
    icon: "🐘",
    category: "backend"
  },
  { 
    name: "TypeScript", 
    icon: "📘",
    category: "frontend"
  },
  { 
    name: "Node.js", 
    icon: "🟢",
    category: "backend"
  },
  { 
    name: "Next.js", 
    icon: "▲",
    category: "frontend"
  },
];


// Projects data
export const projects = [
  {
    title: "Penyewaan Lapangan Futsal",
    description: "Website untuk penyewaan lapangan futsal yang memiliki fitur pencarian lapangan, pemesanan lapangan secara online, serta pembayaran berbasis midtrans.",
    technologies: ["Laravel", "MySQL", "Tailwinds CSS", "Figma", "Midtrans", "Git"],
    icon: "🛒",
    image: "/images/project-1.jpeg",
  },
  {
    title: "Sistem Manajemen Konter Madona Ponsel",
    description: "Sistem manajemen konter madona ponsel yangemiliki fitur penjualan produk, pembelian produk, fitur royalti, fitur laporan keuangan, serta fitur pembayaran.",
    technologies: ["Laravel", "MySQL", "Tailwinds CSS", "Figma", "Git"],
    icon: "📋",
    image: "/images/project-2.jpeg",
  },
  {
    title: "Sistem Pemesanan Air Galon Suci",
    description: "Sistem pemesanan air galon suci yang memiliki fitur pemesanan air galon suci secara online, serta fitur tracking, mutasi stok, status pengiriman, serta pencacatan keuangan",
    technologies: ["Laravel", "MySQL", "Tailwinds CSS", "Figma", "Midtrans", "Git"],
    icon: "🌤️",
    image: "/images/project-3.jpeg",
  },
];


export const socialLinks = [
  { name: "GitHub", icon: "📱", url: "#" },
  { name: "LinkedIn", icon: "💼", url: "#" },
  { name: "Twitter", icon: "🐦", url: "#" },
  { name: "Email", icon: "✉️", url: "mailto:john@example.com" },
];


export const experiences = [
  {
    id: 1,
    company: "Freelance Developer",
    position: "Full Stack Laravel Developer",
    period: "Juni 2024 - Agustus 2025",
    startDate: "2024-06",
    endDate: "2025-08",
    description: "Bertanggung jawab dalam pengembangan aplikasi web full stack menggunakan teknologi Laravel.",
    responsibilities: [
      "Mengembangkan aplikasi web menggunakan framework Laravel",
      "Merancang dan mengimplementasikan database MySQL",
      "Mengintegrasikan API pihak ketiga seperti Midtrans untuk pembayaran",
      "Melakukan code review dan debugging aplikasi",
      "Ber kolaborasi dengan tim desain untuk implementasi UI/UX",
      "Melakukan testing dan optimasi performa aplikasi"
    ],
    icon: "💼",
    logo: "🏢"
  },
  {
    id: 2,
    company: "UPT Perpustakaan Universitas Riau",
    position: "Staff IT",
    period: "Agustus 2024 - Oktober 2024",
    startDate: "2022-06",
    endDate: "2024-10",
    description: "Bertanggung jawab dalam pengembangan sistem perpustakaan universitas riau.",
    responsibilities: [
      "Mendesain ulang website perpustakaan universitas riau menggunakan Wordpress",
      "Menginput data mahasiswa, dosen, dan staff ke dalam sistem perpustakaan",
      "Menginput data peminjaman buku, pengembalian buku, dan peminjaman buku",
      "Berkolaborasi dengan tim desain untuk membuat poster desain poster perpustakaan"
    ],
    icon: "📚",
    logo: "🏢"
  },
];

// Navigation items
export const navItems = [
  { id: "home", label: "Beranda" },
  { id: "about", label: "Tentang" },
  { id: "experience", label: "Pengalaman" },
  { id: "skills", label: "Keterampilan" },
  { id: "projects", label: "Proyek" },
  { id: "contact", label: "Kontak" },
];