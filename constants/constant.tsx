import {
  Code,
  Braces,
  Palette,
  Paintbrush,
  CircleDot,
  LayoutDashboard,
  Smartphone,
  Leaf,
  Server,
  Database,
  Cloud,
  BadgeCheck,
  Boxes,
  Brain,
  FileCode,
  FileText,
  FileJson,
  TerminalSquare,
  MapPin,
  Phone,
  User,
  Mail,
  Github,
  Instagram,
  Twitter,
  Linkedin,
  Facebook,
  Activity,
  Award,
  BarChart,
  Briefcase,
  Folder,
} from 'lucide-react';

const iconSize = 24;
export const user = [
  {
    label: 'Name: ',
    content: 'Mihreteab Bizuayehu',
    icon: User,
    color: '#007BFF',
    size: iconSize,
  },
  {
    label: 'Email: ',
    content: 'lijmihret@gmail.com',
    icon: Mail,
    color: '#FF5733',
    size: iconSize,
  },
  {
    label: 'Phone: ',
    content: '+251 915507862/+251 918231321',
    icon: Phone,
    color: '#28A745',
    size: iconSize,
  },
  {
    label: 'Location: ',
    content: 'Addis Ababa, Ethiopia',
    icon: MapPin,
    color: '#FFC107',
    size: iconSize,
  },
];

export const navItems = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
  {
    href: 'https://shorturl.at/OqAmb',
    label: 'Resume',
  },
  { href: '/blog', label: 'Blog' },
];

export type CertificateContextType = {
  certificates: any[];
  setCertificates: React.Dispatch<React.SetStateAction<any[]>>;
  form: { title: string; description: string; image: string };
  setForm: React.Dispatch<
    React.SetStateAction<{ title: string; description: string; image: string }>
  >;
  editId: number | null;
  setEditId: React.Dispatch<React.SetStateAction<number | null>>;
  handleChange: (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleEdit: (certificate: any) => void;
  handleDelete: (id: number) => Promise<void>;
};

export const socialLinks = [
  {
    href: 'https://github.com/Mihreteab-Bizuayehu',
    icon: Github,
    color: '#333333',
  },
  {
    href: 'https://www.linkedin.com/in/mihreteab-bizuayehu',
    icon: Linkedin,
    color: '#0082ca',
  },
  { href: '#', icon: Twitter, color: '#55acee' },
  {
    href: '#/',
    icon: Instagram,
    color: '#ac2bac',
  },
  {
    href: '#/#',
    icon: Facebook,
    color: '#3b5998',
  },
];

export const iconsConfig = {
  webTechnologies: [{
    label: "HTML5",
    icon: <FileCode color="#E34F26" size={24} />,
    color: "#E34F26",
  },
  {
    label: "CSS3",
    icon: <Palette color="#1572B6" size={24} />,
    color: "#1572B6",
  },
  {
    label: "Bootstrap 5",
    icon: <Boxes color="#7952B3" size={24} />,
    color: "#7952B3",
  },
  {
    label: "Tailwind CSS",
    icon: <Paintbrush color="#38B2AC" size={24} />,
    color: "#38B2AC",
  },
  {
    label: "shadcn/ui",
    icon: <LayoutDashboard color="#64748b" size={24} />,
    color: "#64748b",
  },
  {
    label: "React.js",
    icon: <CircleDot color="#61DAFB" size={24} />,
    color: "#61DAFB",
  },
  {
    label: "Next.js",
    icon: <BadgeCheck color="#000000" size={24} />,
    color: "#000000",
  },
  {
    label: "React Native",
    icon: <Smartphone color="#61DAFB" size={24} />,
    color: "#61DAFB",
  },
  {
    label: "Node.js",
    icon: <Leaf color="#339933" size={24} />,
    color: "#339933",
  },
  {
    label: "Express.js",
    icon: <Server color="#000000" size={24} />,
    color: "#000000",
  },
  {
    label: "MySQL",
    icon: <Database color="#00758F" size={24} />,
    color: "#00758F",
  },
  {
    label: "PostgreSQL",
    icon: <Database color="#336791" size={24} />,
    color: "#336791",
  },
  {
    label: "MongoDB",
    icon: <Cloud color="#47A248" size={24} />,
    color: "#47A248",
  },
  {
    label: "Mongoose ODM",
    icon: <Brain color="#800000" size={24} />,
    color: "#800000",
  },
  {
    label: "Prisma ORM",
    icon: <FileJson color="#0C344B" size={24} />,
    color: "#0C344B",
  },
  ],
  programmingLanguages: [
    {
    label: "C++",
    icon: <Code color="#00599C" size={24} />,
    color: "#00599C",
  },
 {
    label: "Java",
    icon: <Braces color="#007396" size={24} />,
    color: "#007396",
  },
{
    label: "Python",
    icon: <FileText color="#3776AB" size={24} />,
    color: "#3776AB",
  },
 {
    label: "JavaScript",
    icon: <FileCode color="#F7DF1E" size={24} />,
    color: "#F7DF1E",
  },
 {
    label: "TypeScript",
    icon: <TerminalSquare color="#3178C6" size={24} />,
    color: "#3178C6",
  },
  ]
};

export const dashboardItems = [
  {
    name: 'Dashboard',
    icon: BarChart,
    href: '/dashboard',
    size: 32,
    color: '#007BFF',
    strokeWidth: 2,
  },
  {
    name: 'Skills',
    icon: Activity,
    href: '/dashboard/skill',
    size: 32,
    color: 'blue',
    strokeWidth: 2,
  },
  {
    name: 'Certificates',
    icon: Award,
    href: '/dashboard/certificate',
    size: 32,
    color: 'green',
    strokeWidth: 2,
  },
  {
    name: 'Portfolio',
    icon: Briefcase,
    href: '/dashboard/portfolio',
    size: 32,
    color: 'purple',
    strokeWidth: 2,
  },
  {
    name: 'Projects',
    icon: Folder,
    href: '/dashboard/project',
    size: 32,
    color: 'orange',
    strokeWidth: 2,
  },
];

export function truncateWords(text: string, wordLimit: number) {
  const words = text.split(' ');
  return (
    words.slice(0, wordLimit).join(' ') +
    (words.length > wordLimit ? '...' : '')
  );
}
