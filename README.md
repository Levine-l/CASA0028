# Website introduction

This website is to present the London underground map and the distance of London residents to work.

At the top left on the website, there are two button which the top one is to show or hide the choropleth map and the other one is to change the mode of choropleth map between average distance to work and the percentage of distance to work larger than 5km.

At the bottom left, there is a legend for the choropleth map, while at the top right there is one for the tube lines. 

On the map, if click on an MSOA or a tube station, the corresponding information will pop up. For example, when click the Euston Square station, will display the  lines at this statioin: "Hammersmith & City", "Circle", "Metropolitan". Also click the MSOA where UCL is, shows Camden 026, Ratio that commute distance is 5km+：8.8%, Average commute distance：5.9 km, and a bar chart of the distance to work distribution.

All data that I used can be founded at the bottom right button "show sources".







# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is enabled on this template. See [this documentation](https://react.dev/learn/react-compiler) for more information.

Note: This will impact Vite dev & build performances.

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
