export class TodoEntity {
    constructor(
        public id: number,
        public text: string,
        public completedAt: Date | null = null,  // Default to null if not provided
    ) {}

    get isCompleted(): boolean {
        return !!this.completedAt;
    }

    /**
     * Crea una instancia de TodoEntity a partir de un objeto
     * @param object - Un objeto que contiene las propiedades necesarias para crear un TodoEntity
     * @returns Una nueva instancia de TodoEntity
     * @throws Error si faltan 'id' o 'text' o si 'completedAt' no es una fecha válida
     */
    public static fromObject(object: { [key: string]: any }): TodoEntity {
        const { id, text, completedAt } = object;
        
        if (!id) throw new Error('Id is required');
        if (!text) throw new Error('Text is required');

        let parsedCompletedAt = null;
        if (completedAt) {
            parsedCompletedAt = new Date(completedAt);
            if (isNaN(parsedCompletedAt.getTime())) {
                throw new Error('CompletedAt is not a valid Date');
            }
        }

        return new TodoEntity(id, text, parsedCompletedAt);
    }
}