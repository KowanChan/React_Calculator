// Simulated Backend for calculations using own implementation of evaluate
export function evaluate(calc){
	// Set variables to check in other functions
	const ops = ["+","-","/","*"];
	const nums = ["0","1","2","3","4","5","6","7","8","9","."];

	/* Split the given equation into an array, where each item is a full number or an operator. 
		This means that the equation "1+2+32+99999" would be split into ["1","+","2","+","32","+","99999"]
	*/
	function splitIntoArray(calc){
		const temp = [];

		let i = 0;
		let curr = "";

		while(calc.charAt(i) != ""){
			if (ops.includes(calc.charAt(i))) {
				temp.push(curr);
				curr="";
				temp.push(calc.charAt(i));
			}

			else if (nums.includes(calc.charAt(i))){
				curr+=calc.charAt(i);
			}
			i++;
		}

		temp.push(curr);
		return temp;
	}

	// Solve all division and multiplication in order, and mutate the list so that all div and mult are a single number
	function divMult(arrayList){
		console.log("Before "+ arrayList);
		for (let x = 0; x < arrayList.length; x ++) {
			console.log(arrayList[x]);
			if(arrayList[x] == "/"){
				arrayList[x-1] = (parseFloat(arrayList[x-1])/parseFloat(arrayList[x+1]));
				arrayList.splice(x,2);
			}

			else if(arrayList[x] == "*"){
				arrayList[x-1] = (parseFloat(arrayList[x-1])*parseFloat(arrayList[x+1]));
				arrayList.splice(x,2);
			}
		}
	}

	// Perform the addition and subtraction of the array list. Return the result of the equation.
	function addSub(arrayList){
		let total = parseFloat(arrayList[0]);
		for (let x = 1; x < arrayList.length; x+=2) {
			if(arrayList[x] == "+"){
				total += parseFloat(arrayList[x+1]);
			}

			else if(arrayList[x] == "-"){
				total -= parseFloat(arrayList[x+1]);
			}
		}

		return total;
	}

	// Solve the array list given by 
	function solve(arrayList){
		let final = splitIntoArray(calc);
		let finalNum = 0;

		divMult(final);
		finalNum = addSub(final);
		console.log(finalNum);
		return finalNum;
	}

	// This whole function takes Big-O(n) time.
	return solve(calc);
}
