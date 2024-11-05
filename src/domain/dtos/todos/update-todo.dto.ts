

export class UpdateTodoDto {

    private constructor(
        public readonly id: number,
        public readonly text?: string,
        public readonly completedAt?: Date,
    ){}

    get values() {
        const resultObj : {[key: string]: any} = {};

        if (this.text) resultObj.text = this.text;
        if (this.completedAt) resultObj.completedAt = this.completedAt;

        return resultObj;
    }

    static create( props: {[key: string]: any}): [string?, UpdateTodoDto?]{

        const { id, text, completedAt } = props;

        let newCompletedAt = completedAt;
 
        if(!id || isNaN(Number(id))) {
            return ['Id must be a valid number'];
        }
        
       if(completedAt){
         newCompletedAt = new Date(completedAt);
        if(newCompletedAt.toString() === 'Invalid Date'){
            return ['completedAt must be a valid date'];
        }
       }


        return[undefined, new UpdateTodoDto(id, text, newCompletedAt)]
    }
}