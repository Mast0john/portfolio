import React, { useState } from 'react';
import { useStaticQuery, graphql } from 'gatsby';
import PropTypes from 'prop-types';
import Arrow from './helpers/arrow';
import Badge from './helpers/badge';
import FlowNode from './helpers/flowNode';
import GlowLine from './helpers/glowLine';
import GroupBox from './helpers/groupBox';
import DetailPanel from '../Panel/detailPanel';
import { useTranslation } from 'gatsby-plugin-react-i18next';

/* ── Hard Skills Flowchart ── */

/* ─── Palette ──────────────────────────────────────────────── */
const C = {
  bg: '#0d0d1a',
  surface: '#12121f',
  card: '#1a1a2e',
  border: '#252540',
  purple: '#7c6fe0',
  purpleGlow: '#7c6fe033',
  cyan: '#00d4d4',
  cyanGlow: '#00d4d420',
  green: '#00c896',
  greenGlow: '#00c89620',
  orange: '#ff8c42',
  orangeGlow: '#ff8c4220',
  pink: '#e066a0',
  pinkGlow: '#e066a020',
  yellow: '#f5c842',
  yellowGlow: '#f5c84220',
  muted: '#5a5a7a',
  text: '#e0e0f0',
  textDim: '#8888aa',
};

const HardSkillsFlowchart = ({ SKILL_INFO }) => {
  const [selected, setSelected] = useState(null);
  const W = 1280;
  const H = 1520;

  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        filter: {
          fileAbsolutePath: { regex: "/content/skills/hard-skills/" }
          frontmatter: { type: { eq: "skill" } }
        }
      ) {
        edges {
          node {
            fileAbsolutePath
            fields {
              slug
            }
            frontmatter {
              title
              slug
              hex
              logo {
                childImageSharp {
                  fixed(width: 26, height: 26) {
                    ...GatsbyImageSharpFixed
                  }
                }
              }
            }
          }
        }
      }
    }
  `);

  // Créer un objet `logos` pour mapper les slugs aux logos
  const logos = {};
  data.allMarkdownRemark.edges.forEach(({ node }) => {
    const slug = node.fields.slug;
    if (node.frontmatter.logo && slug) {
      logos[slug] = node.frontmatter.logo;
    }
  });

  // Composant N adapté
  const N = ({ skillSlug, ...props }) => (
    <FlowNode
      {...props}
      selected={selected}
      onSelect={setSelected}
      logo={skillSlug ? logos[skillSlug] : null}
    />
  );

  const { t } = useTranslation();

  const label = 'Quota · Middleware · REST endpoints · Soft-delete';

  return (
    <div>
      <div
        style={{
          width: '100%',
          overflowX: 'auto',
          overflowY: 'auto',
          maxHeight: '74vh',
          borderRadius: 16,
        }}>
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          style={{
            borderRadius: 16,
            minWidth: W,
          }}>
          <defs>
            <pattern id="fcgrid" width={40} height={40} patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke={C.border} strokeWidth={0.4} />
            </pattern>
            <radialGradient id="fcglow" cx="50%" cy="40%" r="55%">
              <stop offset="0%" stopColor={C.purple} stopOpacity={0.05} />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>
          <rect width={W} height={H} fill="url(#fcgrid)" />
          <rect width={W} height={H} fill="url(#fcglow)" />
          <GroupBox x={20} y={18} w={1240} h={132} label={t('DESIGN')} color={C.pink} />
          <N
            x={95}
            y={82}
            w={130}
            h={50}
            color={C.pink}
            label="Figma"
            slug="figma"
            hex="F24E1E"
            nodeId="figma"
          />
          <N
            x={250}
            y={82}
            w={150}
            h={50}
            color={C.pink}
            label="Photoshop"
            // logo="photoshop"
            // logoKey="photoshop"
            skillSlug="hard-skills/design/ux-ui/photoshop/"
            hex="31A8FF"
            nodeId="photoshop"
          />
          <N
            x={420}
            y={82}
            w={165}
            h={50}
            color={C.pink}
            label="Premiere Pro"
            // logoKey="premiere"
            skillSlug="hard-skills/design/video/premiere/"
            hex="9999FF"
            nodeId="premiere"
          />
          <N x={590} y={82} w={100} h={50} color={C.pink} label="UML" slug="UML" nodeId="uml" />
          <N
            x={720}
            y={82}
            w={140}
            h={50}
            color={C.pink}
            label="AutoCAD"
            slug="autodesk"
            hex="0696D7"
            nodeId="autocad"
          />
          <N
            x={880}
            y={82}
            w={110}
            h={50}
            color={C.pink}
            label="Catia"
            slug="dassaultsystemes"
            nodeId="catia"
          />
          <N
            x={1020}
            y={82}
            w={155}
            h={50}
            color={C.pink}
            label="Solidworks"
            skillSlug="hard-skills/design/cad/solidworks/"
            nodeId="solidworks"
          />
          <GlowLine x1={640} y1={152} x2={640} y2={188} color={C.pink} dash={true} />
          <Badge x={700} y={170} label="Design System" color={C.pink} />
          <GroupBox x={20} y={190} w={1240} h={250} label="FRONT-END" color={C.purple} />
          <Badge x={190} y={225} label="FRAMEWORKS" color={C.purple} />
          <N
            x={90}
            y={262}
            w={140}
            h={52}
            color={C.purple}
            label="Bootstrap"
            slug="bootstrap"
            hex="7952B3"
            nodeId="bootstrap"
          />
          <N
            x={260}
            y={262}
            w={170}
            h={52}
            color={C.purple}
            label="React / RN"
            slug="react"
            hex="61DAFB"
            sublabel="React Native"
            nodeId="react"
          />
          <N
            x={440}
            y={262}
            w={140}
            h={52}
            color={C.purple}
            label="Vue 3"
            slug="vuedotjs"
            hex="4FC08D"
            sublabel="Vue.js"
            nodeId="vue"
          />
          <N
            x={600}
            y={262}
            w={140}
            h={52}
            color={C.purple}
            label="Gatsby.js"
            slug="gatsby"
            hex="663399"
            nodeId="gatsby"
          />
          <Badge x={870} y={225} label={t('LANGUAGES')} color={C.cyan} />
          <N
            x={760}
            y={262}
            w={110}
            h={52}
            color={C.cyan}
            label="HTML5"
            slug="html5"
            hex="E34F26"
            nodeId="html5"
          />
          <N
            x={900}
            y={262}
            w={130}
            h={52}
            color={C.cyan}
            label="CSS3 / Sass"
            slug="css"
            hex="1572B6"
            sublabel="SCSS · Less"
            nodeId="css3"
          />
          <N
            x={1060}
            y={262}
            w={150}
            h={52}
            color={C.cyan}
            label="JavaScript"
            slug="javascript"
            hex="F7DF1E"
            sublabel="ES6+"
            nodeId="javascript"
          />
          <N
            x={1210}
            y={262}
            w={110}
            h={52}
            color={C.cyan}
            label="jQuery"
            slug="jquery"
            hex="0769AD"
            nodeId="jquery"
          />
          <line
            x1={40}
            y1={332}
            x2={1240}
            y2={332}
            stroke={C.purple}
            strokeOpacity={0.1}
            strokeWidth={1}
          />
          <N
            x={90}
            y={368}
            w={120}
            h={46}
            color={C.purple}
            label="Sass"
            slug="sass"
            hex="CC6699"
            nodeId="sass"
          />
          <N
            x={230}
            y={368}
            w={115}
            h={46}
            color={C.purple}
            label="Motion"
            slug="framer"
            hex="0055FF"
            nodeId="motion"
          />
          <N
            x={400}
            y={368}
            w={195}
            h={46}
            color={C.purple}
            label="Styled Comp."
            slug="styledcomponents"
            hex="DB7093"
            nodeId="styledcomp"
          />
          <N x={620} y={368} w={110} h={46} color={C.cyan} label="Less" slug="less" nodeId="less" />
          <N
            x={760}
            y={368}
            w={155}
            h={46}
            color={C.cyan}
            label="TypeScript"
            slug="typescript"
            hex="3178C6"
            nodeId="typescript"
          />
          <Arrow x1={640} y1={442} x2={640} y2={478} color={C.purple} label={t('HTTP Request')} />
          <GroupBox x={280} y={480} w={720} h={80} label="API / CONFIG" color={C.cyan} />
          <N x={420} y={528} w={110} h={48} color={C.cyan} label="JSON" slug="json" nodeId="json" />
          <N
            x={570}
            y={528}
            w={110}
            h={48}
            color={C.cyan}
            label="REST"
            skillSlug="hard-skills/dev/api/rest/"
            nodeId="rest"
          />
          <N x={730} y={528} w={110} h={48} color={C.cyan} label="XML" slug="xml" nodeId="xml" />
          <N
            x={880}
            y={528}
            w={120}
            h={48}
            color={C.cyan}
            label="GraphQL"
            slug="graphql"
            hex="E10098"
            nodeId="graphql"
          />
          <Arrow x1={640} y1={562} x2={640} y2={598} color={C.cyan} label="REST / JSON" />
          <GroupBox x={20} y={600} w={1240} h={210} label="BACK-END" color={C.green} />
          <Badge x={280} y={625} label="FRAMEWORKS" color={C.green} />
          <N
            x={100}
            y={665}
            w={180}
            h={54}
            color={C.green}
            label="Ruby on Rails"
            slug="rubyonrails"
            hex="D30001"
            sublabel="Ruby"
            nodeId="rails"
          />
          <N
            x={295}
            y={665}
            w={150}
            h={54}
            color={C.green}
            label="Magento 2"
            skillSlug="hard-skills/dev/backend/framework/magento/"
            hex="EE672F"
            sublabel="PHP 5"
            nodeId="magento"
          />
          <N
            x={455}
            y={665}
            w={110}
            h={54}
            color={C.green}
            label="PHP"
            slug="php"
            hex="777BB4"
            nodeId="php"
          />
          <N
            x={580}
            y={665}
            w={100}
            h={54}
            color={C.green}
            label="Java"
            slug="openjdk"
            hex="ED8B00"
            nodeId="java"
          />
          <N
            x={720}
            y={665}
            w={160}
            h={54}
            color={C.green}
            label="C# / ASP.NET"
            slug="dotnet"
            hex="512BD4"
            nodeId="dotnet"
          />
          <N
            x={910}
            y={665}
            w={170}
            h={54}
            color={C.green}
            label="Arduino / IoT"
            slug="arduino"
            hex="00979D"
            sublabel="IOE"
            nodeId="arduino"
          />
          <Badge x={1105} y={625} label={t('RUNTIME')} color={C.orange} />
          <N
            x={1115}
            y={665}
            w={155}
            h={54}
            color={C.orange}
            label="Node.js"
            slug="nodedotjs"
            hex="339933"
            nodeId="nodejs"
          />
          <line
            x1={40}
            y1={724}
            x2={1240}
            y2={724}
            stroke={C.green}
            strokeOpacity={0.1}
            strokeWidth={1}
          />
          <Badge x={640} y={755} w={label.length * 6.5 + 120} label={label} color={C.green} />
          <Arrow x1={280} y1={810} x2={280} y2={848} color={C.pink} label="SQL" animated={false} />
          <Arrow
            x1={980}
            y1={810}
            x2={980}
            y2={848}
            color={C.orange}
            label="NoSQL"
            animated={false}
          />
          <GroupBox x={20} y={850} w={680} h={80} label="SQL" color={C.pink} />
          <N
            x={110}
            y={898}
            w={140}
            h={46}
            color={C.pink}
            label="MySQL"
            slug="mysql"
            hex="4479A1"
            nodeId="mysql"
          />
          <N
            x={280}
            y={898}
            w={160}
            h={46}
            color={C.pink}
            label="PostgreSQL"
            slug="postgresql"
            hex="4169E1"
            nodeId="postgresql"
          />
          <N
            x={485}
            y={898}
            w={195}
            h={46}
            color={C.pink}
            label="SQL Server"
            skillSlug="hard-skills/dev/storage/sql/sqlserver/"
            hex="CC2927"
            sublabel="T-SQL"
            nodeId="sqlserver"
          />
          <GroupBox x={760} y={850} w={500} h={80} label="NoSQL" color={C.orange} />
          <N
            x={880}
            y={898}
            w={155}
            h={46}
            color={C.orange}
            label="Firebase"
            slug="firebase"
            hex="FFCA28"
            nodeId="firebase"
          />
          <N
            x={1080}
            y={898}
            w={155}
            h={46}
            color={C.orange}
            label="MongoDB"
            slug="mongodb"
            hex="47A248"
            nodeId="mongodb"
          />
          {/* <GlowLine x1={40} y1={980} x2={1240} y2={980} color={C.yellow} dash={true} /> */}
          <GroupBox x={20} y={990} w={1240} h={260} label={t('TOOLS')} color={C.yellow} />
          <Badge x={155} y={1015} label={t('BUILD')} color={C.yellow} />
          <N
            x={85}
            y={1055}
            w={110}
            h={46}
            color={C.yellow}
            label="Vite"
            slug="vite"
            hex="646CFF"
            nodeId="vite"
          />
          <N
            x={215}
            y={1055}
            w={140}
            h={46}
            color={C.yellow}
            label="Webpack"
            slug="webpack"
            hex="8DD6F9"
            nodeId="webpack"
          />
          <Badge x={435} y={1015} label={t('VERSIONING')} color={C.yellow} />
          <N
            x={350}
            y={1055}
            w={100}
            h={46}
            color={C.yellow}
            label="Git"
            slug="git"
            hex="F05032"
            nodeId="git"
          />
          <N
            x={470}
            y={1055}
            w={120}
            h={46}
            color={C.yellow}
            label="GitLab"
            slug="gitlab"
            hex="FC6D26"
            nodeId="gitlab"
          />
          <N
            x={610}
            y={1055}
            w={130}
            h={46}
            color={C.yellow}
            label="GitHub"
            slug="github"
            hex="f0f0f0"
            nodeId="github"
          />
          <N
            x={470}
            y={1110}
            w={130}
            h={46}
            color={C.yellow}
            label="Jenkins"
            slug="jenkins"
            hex="D24939"
            nodeId="jenkins"
          />
          <Badge x={965} y={1015} label={t('DEPLOYMENT')} color={C.orange} />
          <N
            x={865}
            y={1055}
            w={120}
            h={46}
            color={C.orange}
            label="Docker"
            slug="docker"
            hex="2496ED"
            nodeId="docker"
          />
          <N
            x={1005}
            y={1055}
            w={150}
            h={46}
            color={C.orange}
            label="Kubernetes"
            slug="kubernetes"
            hex="326CE5"
            nodeId="kubernetes"
          />
          <N
            x={1160}
            y={1055}
            w={125}
            h={46}
            color={C.orange}
            label="Azure"
            skillSlug="hard-skills/tools/virtu/azure/"
            hex="0078D4"
            nodeId="azure"
          />
          <line
            x1={40}
            y1={1150}
            x2={1240}
            y2={1150}
            stroke={C.yellow}
            strokeOpacity={0.1}
            strokeWidth={1}
          />
          <Badge x={250} y={1170} label=" IDE" color={C.yellow} />
          <N
            x={110}
            y={1210}
            w={130}
            h={44}
            color={C.yellow}
            label="VS Code"
            skillSlug="hard-skills/tools/ide/vscode/"
            hex="007ACC"
            nodeId="vscode"
          />
          <N
            x={255}
            y={1210}
            w={140}
            h={44}
            color={C.yellow}
            label="PhpStorm"
            slug="phpstorm"
            hex="AF73E3"
            nodeId="phpstorm"
          />
          <N
            x={410}
            y={1210}
            w={120}
            h={44}
            color={C.yellow}
            label="Eclipse"
            slug="eclipseide"
            hex="8a7bc8"
            nodeId="eclipse"
          />
          <N
            x={865}
            y={1110}
            w={150}
            h={44}
            color={C.yellow}
            label="Terraform"
            slug="terraform"
            hex="7B42BC"
            nodeId="terraform"
          />
          <Badge x={800} y={1170} label="CMS" color={C.yellow} />
          <N
            x={710}
            y={1210}
            w={140}
            h={44}
            color={C.yellow}
            label="PrestaShop"
            slug="prestashop"
            hex="DF0067"
            nodeId="prestashop"
          />
          <N
            x={870}
            y={1210}
            w={140}
            h={44}
            color={C.yellow}
            label="WordPress"
            slug="wordpress"
            hex="21759B"
            nodeId="wordpress"
          />
          <N
            x={1005}
            y={1110}
            w={110}
            h={44}
            color={C.yellow}
            label="Expo"
            slug="expo"
            hex="f0f0f0"
            nodeId="expo"
          />
          <N
            x={1160}
            y={1110}
            w={115}
            h={44}
            color={C.orange}
            label="VMware"
            slug="vmware"
            hex="607078"
            nodeId="vmware"
          />
          <GroupBox x={20} y={1278} w={570} h={80} label="DATAVIZ" color={C.cyan} />
          <N
            x={100}
            y={1326}
            w={130}
            h={46}
            color={C.cyan}
            label="Elastic"
            slug="elastic"
            hex="00BFB3"
            nodeId="elastic"
          />
          <N
            x={270}
            y={1326}
            w={130}
            h={46}
            color={C.cyan}
            label="Kibana"
            slug="kibana"
            hex="339acc"
            nodeId="kibana"
          />
          <N
            x={435}
            y={1326}
            w={130}
            h={46}
            color={C.cyan}
            label="Power BI"
            skillSlug="hard-skills/tools/dataviz/powerbi/"
            hex="F2C811"
            nodeId="powerbi"
          />
          <GroupBox x={650} y={1278} w={610} h={80} label={t('OPERATING SYSTEMS')} color={C.cyan} />
          <N
            x={760}
            y={1326}
            w={120}
            h={46}
            color={C.cyan}
            label="Debian"
            slug="debian"
            hex="A81D33"
            nodeId="debian"
          />
          <N
            x={900}
            y={1326}
            w={110}
            h={46}
            color={C.cyan}
            label="Linux"
            slug="linux"
            hex="FCC624"
            nodeId="linux"
          />
          <N
            x={1030}
            y={1326}
            w={120}
            h={46}
            color={C.cyan}
            label="Ubuntu"
            slug="ubuntu"
            hex="E95420"
            nodeId="ubuntu"
          />
          <N
            x={1175}
            y={1326}
            w={130}
            h={46}
            color={C.cyan}
            label="Windows"
            skillSlug="hard-skills/operating-system/windows/"
            hex="0078D6"
            nodeId="windows"
          />
          <rect
            x={20}
            y={H - 90}
            width={355}
            height={90}
            rx={8}
            fill={C.card}
            stroke={C.border}
            strokeWidth={1}
          />
          <text
            x={34}
            y={H - 70}
            fontSize={9}
            fill={C.textDim}
            fontFamily="'JetBrains Mono',monospace"
            fontWeight={700}
            letterSpacing={1}>
            LÉGENDE
          </text>
          {[
            [C.pink, 'Design · SQL'],
            [C.purple, 'Front-end'],
            [C.cyan, 'API · OS · DataViz'],
            [C.green, 'Back-end'],
            [C.orange, 'Runtime · NoSQL'],
            [C.yellow, 'Tools'],
          ].map(([col, lbl], i) => (
            <g key={lbl}>
              <rect
                x={34 + (i % 2) * 172}
                y={H - 58 + Math.floor(i / 2) * 17}
                width={8}
                height={8}
                rx={2}
                fill={col}
              />
              <text
                x={48 + (i % 2) * 172}
                y={H - 51 + Math.floor(i / 2) * 17}
                fontSize={9}
                fill={C.textDim}
                fontFamily="'Space Grotesk',sans-serif">
                {lbl}
              </text>
            </g>
          ))}
          <rect
            x={W - 175}
            y={H - 34}
            width={158}
            height={22}
            rx={6}
            fill={C.card}
            stroke={C.border}
            strokeWidth={1}
          />
          <text
            x={W - 96}
            y={H - 19}
            textAnchor="middle"
            fontSize={9}
            fill={C.textDim}
            fontFamily="'JetBrains Mono',monospace">
            Full-Stack Architecture
          </text>
        </svg>
      </div>
      <div style={{ marginTop: 16 }}>
        <DetailPanel
          infoKey={selected}
          SKILL_INFO={SKILL_INFO}
          onClose={() => setSelected(null)}
          hint={t('← Click on a node to display its description')}
        />
      </div>
    </div>
  );
};

HardSkillsFlowchart.propTypes = {
  SKILL_INFO: PropTypes.object.isRequired,
  skillSlug: PropTypes.string,
};

HardSkillsFlowchart.displayName = 'HardSkillsFlowchart';

export default HardSkillsFlowchart;
