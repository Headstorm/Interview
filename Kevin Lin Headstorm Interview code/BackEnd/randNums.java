public class randNums {

    public static final int NUM_NUMBERS = 500;

    // generate array of 500 random integers for JSON for backend GET/PUT endpoints in rest api
    public static int[] generateNumArray() {
        int[] vals = new int[NUM_NUMBERS];
        for(int i = 0; i < NUM_NUMBERS; i++) {
            vals[i] = (int) (Math.random() * 500);
        }
        return vals;
    }
    public static void main(String args[]) {
        int[] arr = generateNumArray();
        System.out.println(arr.toString());
    }
}