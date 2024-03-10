class Pagination {
    constructor(ui) {
      this.ui = ui; 
      this.container = document.querySelector('.pagination'); 
      this.currentPage = 0;
    }
  
    update(totalItems, itemsPerPage) {
        this.container.innerHTML = '';
    
        const totalPages = Math.ceil(totalItems / itemsPerPage);
        const startPage = Math.max(1, this.currentPage - 2);
        const endPage = Math.min(totalPages, this.currentPage + 3);
    
        //prev page
        const prevButton = document.createElement('button');
        prevButton.textContent = '←';
        prevButton.disabled = this.currentPage === 0; //disable on the first page
        prevButton.onclick = () => this.gotoPage(this.currentPage - 1);
        this.container.appendChild(prevButton);
    
        //first page and "..."
        if (startPage > 1) {
            const firstPageBtn = document.createElement('button');
            firstPageBtn.textContent = '1';
            firstPageBtn.onclick = () => this.gotoPage(0);
            this.container.appendChild(firstPageBtn);
    
            if (startPage > 2) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                this.container.appendChild(dots);
            }
        }
    
        //page number
        for (let i = startPage; i <= endPage; i++) {
            const pageButton = document.createElement('button');
            pageButton.textContent = i;
            pageButton.className = this.currentPage + 1 === i ? 'active' : '';
            pageButton.disabled = this.currentPage + 1 === i; //disable current page
            pageButton.onclick = () => this.gotoPage(i - 1);
            this.container.appendChild(pageButton);
        }
    
        //"..." and last page
        if (endPage < totalPages) {
            if (endPage < totalPages - 1) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                this.container.appendChild(dots);
            }
    
            const lastPageBtn = document.createElement('button');
            lastPageBtn.textContent = totalPages;
            lastPageBtn.onclick = () => this.gotoPage(totalPages - 1);
            this.container.appendChild(lastPageBtn);
        }
    
        //next page
        const nextButton = document.createElement('button');
        nextButton.textContent = '→';
        nextButton.disabled = this.currentPage === totalPages - 1; //disable last page
        nextButton.onclick = () => this.gotoPage(this.currentPage + 1);
        this.container.appendChild(nextButton);
    }
  
    gotoPage(pageNumber) {
      this.currentPage = pageNumber;
      this.ui.renderPage(pageNumber, this.ui.limit); 
      this.update(this.ui.totalItems, this.ui.limit); 
    }
  }

  export default Pagination;