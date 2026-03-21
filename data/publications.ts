export interface Publication {
  number: number;
  title: string;
  category: string;
  link: string;
}

export const publications: Publication[] = [
  {
    number: 1,
    title: "Comparison of Monocular Depth Estimation Algorithms on 2D Images",
    category: "Computer Vision",
    link: "http://www.warse.org/IJATCSE/static/pdf/file/ijatcse021012021.pdf",
  },
  {
    number: 2,
    title: "React to the React App: How To Hard Reload Your React Web App Using Error Boundary",
    category: "Web",
    link: "https://www.wednesday.is/writing-tutorials/react-to-the-react-app-how-to-hard-reload-your-react-web-app-using-error-boundary",
  },
];
