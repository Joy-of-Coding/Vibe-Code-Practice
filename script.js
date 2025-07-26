class ChecklistApp {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('vibeChecklistTasks')) || [];
        this.taskForm = document.getElementById('taskForm');
        this.taskInput = document.getElementById('taskInput');
        this.taskList = document.getElementById('taskList');
        this.emptyState = document.getElementById('emptyState');
        this.completedCount = document.getElementById('completedCount');
        this.totalCount = document.getElementById('totalCount');
        
        this.init();
    }
    
    init() {
        this.taskForm.addEventListener('submit', (e) => this.addTask(e));
        this.renderTasks();
        this.updateStats();
    }
    
    addTask(e) {
        e.preventDefault();
        
        const taskText = this.taskInput.value.trim();
        if (!taskText) return;
        
        const task = {
            id: Date.now(),
            text: taskText,
            completed: false,
            createdAt: new Date().toISOString()
        };
        
        this.tasks.unshift(task);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
        
        this.taskInput.value = '';
        this.taskInput.focus();
    }
    
    toggleTask(taskId) {
        const task = this.tasks.find(t => t.id === taskId);
        if (task) {
            task.completed = !task.completed;
            this.saveTasks();
            this.renderTasks();
            this.updateStats();
        }
    }
    
    deleteTask(taskId) {
        this.tasks = this.tasks.filter(t => t.id !== taskId);
        this.saveTasks();
        this.renderTasks();
        this.updateStats();
    }
    
    renderTasks() {
        if (this.tasks.length === 0) {
            this.taskList.style.display = 'none';
            this.emptyState.style.display = 'block';
            return;
        }
        
        this.taskList.style.display = 'block';
        this.emptyState.style.display = 'none';
        
        this.taskList.innerHTML = this.tasks.map(task => `
            <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
                <div class="task-checkbox ${task.completed ? 'checked' : ''}" onclick="app.toggleTask(${task.id})"></div>
                <span class="task-text">${this.escapeHtml(task.text)}</span>
                <button class="delete-btn" onclick="app.deleteTask(${task.id})" title="Delete task">🗑️</button>
            </li>
        `).join('');
    }
    
    updateStats() {
        const completed = this.tasks.filter(t => t.completed).length;
        const total = this.tasks.length;
        
        this.completedCount.textContent = completed;
        this.totalCount.textContent = total;
    }
    
    saveTasks() {
        localStorage.setItem('vibeChecklistTasks', JSON.stringify(this.tasks));
    }
    
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
}

// Initialize the app
const app = new ChecklistApp();

// Add some keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Enter to add task
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        document.getElementById('taskForm').dispatchEvent(new Event('submit'));
    }
    
    // Escape to clear input
    if (e.key === 'Escape') {
        document.getElementById('taskInput').value = '';
        document.getElementById('taskInput').blur();
    }
});

// Focus on input when page loads
window.addEventListener('load', () => {
    document.getElementById('taskInput').focus();
}); 