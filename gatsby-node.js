/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require('path');

exports.onCreatePage = ({ page, actions }) => {
  const { createPage } = actions;
  createPage({
    ...page,
    context: {
      ...page.context,
      // 👇 Injecte la langue dans chaque page (déjà fait par gatsby-plugin-react-i18next)
      // Pas besoin de modifier, le plugin le fait automatiquement
    },
  });
};

// https://www.gatsbyjs.org/docs/node-apis/#onCreateWebpackConfig
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  // https://www.gatsbyjs.org/docs/debugging-html-builds/#fixing-third-party-modules
  if (stage === 'build-html' || stage === 'develop-html') {
    actions.setWebpackConfig({
      module: {
        rules: [
          { test: /scrollreveal/, use: loaders.null() },
          { test: /animejs/, use: loaders.null() },
          { test: /miniraf/, use: loaders.null() },
          { test: /react-tsparticles/, use: loaders.null() },
          { test: /tsparticles/, use: loaders.null() },
        ],
      },
    });
  }

  actions.setWebpackConfig({
    resolve: {
      alias: {
        '@components': path.resolve(__dirname, 'src/components'),
        '@config': path.resolve(__dirname, 'src/config'),
        '@fonts': path.resolve(__dirname, 'src/fonts'),
        '@hooks': path.resolve(__dirname, 'src/hooks'),
        '@images': path.resolve(__dirname, 'src/images'),
        '@pages': path.resolve(__dirname, 'src/pages'),
        '@styles': path.resolve(__dirname, 'src/styles'),
        '@utils': path.resolve(__dirname, 'src/utils'),
        // // Alias qui remplace framer-motion par notre version safe
        // 'framer-motion': path.resolve(__dirname, 'src/components/SafeAnimations.js'),
        // // Alias qui remplace react-transition-group par notre version safe
        // 'react-transition-group': path.resolve(__dirname, 'src/components/SafeAnimations.js'),
      },
    },
  });
};

/* ──────────────────── Slug Generate w/ img in 'content/skills' ──────────────────── */

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const fileNode = getNode(node.parent);
    const slug = path
      .relative(path.join(__dirname, 'content/skills'), fileNode.absolutePath)
      .replace(/\\/g, '/') // Remplace les \ par / pour Windows
      .replace(/\.md$/, '') // Supprime ".md"
      .replace(/index$/, ''); // Supprime "index" à la fin

    createNodeField({
      node,
      name: `slug`,
      value: slug,
    });
  }
};
