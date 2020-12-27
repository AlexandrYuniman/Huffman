function Node(letter, frequency, used, link, code) {
	this.letter = letter;
	this.frequency = frequency;
	this.used = used;
	this.link = link;
	this.code = code;
}
let str = 'abrakadabra';
let alph = new Array();
let tree = new Array();//здесь хранятся элементы дерева
for (let i = 0; i < str.length; i++) {
	alph[str.charAt(i)] = 0;
}
for (let i = 0; i < str.length; i++) {
	alph[str.charAt(i)]++;
	
}
for (i in alph) {
	let newNode = new Node(i, alph[i], false, null, '');
	tree.push(newNode);
}

treeLength = tree.length;
	for (let i = 0; i < treeLength - 1; i++) {		
		FirstMinInd = FindMin(tree, str.length, '0');
		SecondMinInd = FindMin(tree, str.length, '1');
		tree[FirstMinInd].link = tree[SecondMinInd].link = tree.length;
		let newNode = new Node(tree[SecondMinInd].letter + tree[FirstMinInd].letter, tree[FirstMinInd].frequency + tree[SecondMinInd].frequency, false, null, '')
		tree.push(newNode);
		//console.log(tree)		
}

function FindMin(tree, Minfrequency, code) { //поиск элемента в дереве с минимальной частотой
	let MinInd = -1;
	for (let j = 0; j < tree.length; j++) {
		if ((tree[j].used == false) && (tree[j].frequency <= Minfrequency)) {
			MinInd = j;
			Minfrequency = tree[j].frequency;
		}		
	}
	tree[MinInd].code = code;
	tree[MinInd].used = true;
	return MinInd;
}


let letterCode = new Array();// таблица: буквы - ключи, коды - значения
let codeLetter = new Array();// таблица: коды - ключи, буквы - значения
let root = tree[treeLength * 2 - 2]
for (let i = 0; i < treeLength; i++) {
	let leaf = tree[i];
	while (leaf != root) {		
		tree[i].code = tree[leaf.link].code + tree[i].code;
		leaf = tree[leaf.link];
	}
	letterCode[tree[i].letter] = tree[i].code;
	codeLetter[tree[i].code] = tree[i].letter;
}


let codedMessage = '';
console.log(letterCode)
for (let i = 0; i < str.length; i++) {
	codedMessage += letterCode[str[i]];
}
console.log(codedMessage);


let decodedMessage = '';
let tempStr = '';
for (let i = 0; i < codedMessage.length; i++) {
	tempStr += codedMessage[i];
	if (codeLetter[tempStr] != undefined) {
		decodedMessage += codeLetter[tempStr]
		tempStr = '';
	}
}
console.log(decodedMessage)