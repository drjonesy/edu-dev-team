const header = (linkHome, linkAbout) => {
    return `
<nav class="navbar sticky-top navbar-expand-lg nav-white py-3 mobile-nav">
  <div class="container">
    <div class="col-md  font-effect-shadow-multiple logo">
      <a class="navbar-brand" href="${linkHome}"><h1>EduDevTeam</h1></a>
    </div>
    <div class="logo-border mt-1 mb-3"></div>
    <div class="col-md float-right">
      <a href="${linkHome}"><button class="rounded-btn bg-pink text-white nav-margin btn-hover">home</button></a>  
      <a href="${linkAbout}"><button class="rounded-btn bg-violet text-white nav-margin btn-hover">about</button></a>
    </div>
  </div>
</nav>
`};