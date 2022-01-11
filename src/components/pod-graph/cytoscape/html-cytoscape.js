import cytoscape from 'cytoscape';
import nodeHtmlLabel from 'cy-node-html-label';
import sanitizeHtml from 'sanitize-html';

nodeHtmlLabel(cytoscape);

export default function applyHtmlLabel(cy) {
  cy.nodeHtmlLabel([
    {
      query: '.customNodes',
      halign: 'center',
      valign: 'center',
      halignBox: 'center',
      valignBox: 'center',
      tpl(data) {
        return `
          <div class="card-front" data-id="${sanitizeHtml(data.id)}">
            <div class="card-front__tp">
              <img class="image-bg" src="${sanitizeHtml(data.imageUrl)}" alt="" />
              <h2 class="card-front__heading">
                ${sanitizeHtml(data.title)}
              </h2>
            </div>
            <div class="card-front-btn">
              <div class="card-front__details">
                <span class="cardStats_stat cardStats_stat-likes">
                 5 <i class="fas fa-headset"></i>
                </span>
                <span class='cardStats_stat cardStats_stat-comments'>
                 54 <i class='far fa-comment fa-fw'></i>
                </span>
              </div>
            </div>
          </div>
        `;
      },
    },
    {
      query: '.customGroup',
      halign: 'center',
      valign: 'center',
      halignBox: 'center',
      valignBox: 'center',
      tpl(data) {
        return `
          <div class="group ${data.collapsedChildren ? 'show' : 'hide'}" data-id="${sanitizeHtml(data.id)}">
             <div class="card-front-btn">
              <div class="card-front__details">
                <span class="cardStats_stat cardStats_stat-likes">
                  69 <i class="fas fa-headset"></i>
                </span>
                <span class='cardStats_stat cardStats_stat-comments'>
                  69 <i class='far fa-comment fa-fw'></i>
                </span>
              </div>
            </div>
          </div>
        `;
      },
    },
  ]);
}
