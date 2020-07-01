# MongooseExample


```Java
public class Exceptions {

    public static void main(String[] args) {
        try {
            /** The system will try to run whatever code is 
            * inside here 
            */
        } catch(ExceptionType name) {
            /**
            * If an exception occurs in the try block that matches
            * ExceptionType of the catch statement then this block
            * of code will run, name is the reference variable for
            * the exception
            */
        } finally {
            /**
            * Code within this block will always run regardless
            * of whether or not an exception was thrown
            */
        }
    }
}
```
