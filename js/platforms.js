/* ============================================================
   GlobalDS OS — platform landscape and convergence scope
   ============================================================ */

function renderPlatformScope(){
  const activePlatforms = DS.platforms.filter(platform => platform.adoption === 'now');
  const deferredPlatforms = DS.platforms.filter(platform => platform.adoption === 'deferred');
  const futurePlatforms = DS.platforms.filter(platform => platform.adoption === 'future');
  const adoptionLabel = { now:'In scope now', deferred:'DFF dependent', future:'Expansion path' };

  return `<section class="section platform-scope" aria-labelledby="platform-scope-title">
    <div class="platform-scope-head">
      <div>
        <span class="platform-kicker">Operating context</span>
        <h2 id="platform-scope-title" class="section-title">Three live systems. One global foundation.</h2>
      </div>
      <p>GlobalDS OS begins by converging the design systems that development can implement consistently today, while keeping the full ICICI Bank platform estate visible.</p>
    </div>

    <div class="platform-scope-grid">
      <article class="platform-scope-primary">
        <header><span>Converging now</span><strong>${DS.sourceSystems.length} source systems</strong></header>
        <div class="source-system-list">${DS.sourceSystems.map(system => `
          <div><i class="ti ti-circle-check-filled" aria-hidden="true"></i><span><strong>${esc(system.name)}</strong><small>${esc(system.basis)}</small></span></div>
        `).join('')}</div>
        <p>These systems define the first shared colour contract: iMobile Android, iMobile iOS and RIB.</p>
      </article>

      <aside class="platform-scope-deferred">
        <span class="platform-kicker">DFF readiness</span>
        <h3>Corporate channels follow later.</h3>
        <p>CIB and InstaBiz remain deliberately outside the current convergence boundary until their development foundations are ready.</p>
        <div>${DS.deferredSystems.map(system => `
          <span><strong>${esc(system.name)}</strong><small>Deferred</small></span>
        `).join('')}</div>
      </aside>
    </div>

    <div class="platform-ledger" role="table" aria-label="ICICI Bank platform coverage" aria-rowcount="${DS.platforms.length + 1}">
      <div class="platform-row platform-row-head" role="row">
        <span role="columnheader">Platform</span><span role="columnheader">Role</span><span role="columnheader">GlobalDS adoption</span>
      </div>
      ${[...activePlatforms, ...deferredPlatforms, ...futurePlatforms].map(platform => `
        <div class="platform-row" role="row" data-adoption="${esc(platform.adoption)}">
          <span role="cell"><strong>${esc(platform.name)}</strong><small>${esc(platform.fullName)}</small></span>
          <span role="cell">${esc(platform.channel)}</span>
          <span role="cell"><i aria-hidden="true"></i>${esc(adoptionLabel[platform.adoption])}</span>
        </div>
      `).join('')}
    </div>
  </section>`;
}
