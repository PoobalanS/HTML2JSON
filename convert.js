const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
  
  
var html2json = require('html2json').html2json;
var json2html = require('html2json').json2html;


const convert = function () { 
	
	fs.readFile("test3.html","utf8", function (error, html) {
	if (error) {
		throw error;
		}
		json =  html2json(html);
		fs.writeFile ("input.json", JSON.stringify(json), function(err) {
			if (err) throw err;
			console.log('complete');
		});
		return json;
	});
	
	return true;
 }
 
 const get_content = function(data) {
	
	let content_val = ''
	
	data.child.forEach(element =>{
		
		if (element.node == 'text' && element.text != '\n'){
			
			content_val += element.text
		}
		
		if(element.node == 'element'){
			
			content_val += get_content(element)
		}
	});
	
	return content_val
	
 }
 
 
 const findChild = function (data,p_id,level) { 
	
	if(typeof data == "object")
	{
		all_elements = []
		
		data.forEach(element => {
						
			if(element.node == 'element')
			{
				let result = {}
				
				let content = ''
					
				result = {
					id: uuidv4(),
					node: element.node,
					tag: element.tag,
					attr: element.attr,
					content: '',
					parentID: p_id,
					level: level,
					content_type: ''
				}
					
				if(element.child)
				{
					element.child.forEach(element1 =>{
						
						if(element1.node == 'text' && element1.text != '\n')
						{
							content += element1.text
						}
					
					})
					
					if(content != ''){
						
						result.content_type = 'content'	
						content = get_content(element)
						result.content = content	
						// console.log('content:',content)
					}
					else{
						
						result.content_type = 'container'
						result.content = content
						findChild(element.child,result.id,level+1)	
					}
				
					console.log('result:',result)
					
					
				}	
			}
			
		});
		
		return true;
		
	}

	// if(data.length > 1) {	
	// 	data.forEach(element => {
	// 		try {
	// 			if(element.child){
	// 				let result = findChild(element.child)
	// 				console.log(result)
	// 			}
	// 			else{
	// 				return element.text
	// 			}
	// 		} catch (error) {
	// 			console.log('error in loop elements');
	// 		}
			
	// 	});	
	// }
	// else{
	// 	try {
	// 		if(data[0].child){
	// 			if(data[0].child.length > 1)
	// 			{
	// 				return findChild(data[0].child)	
	// 			}
	// 			else if(data[0].child[0].child)
	// 			{
	// 				return findChild(data[0].child)	
	// 			}
	// 			else{
	// 				result = {
	// 					id: Math.floor(Math.random() * 100000),
	// 					node: data[0].node,
	// 					tag: data[0].tag,
	// 					attr: data[0].attr,
	// 					content: data[0].child[0].text
	// 				}
	// 				console.log(result)
	// 				return result;
	// 			}
	// 		}
	// 	} catch (error) {
	// 		console.log('error',error);
	// 	}
		
	// }
	
	
 }
 
 const removeNewline = function (data) {
	
	data.forEach((item, index, object) => {
		
		if (item.node === "text" && item.text == "\n") {
			object.splice(index, 1);
			console.log('new line found');
		}
		
		if(item.node === "element"){
			console.log(item.child);
			if(item.child){
				removeNewline(item.child)
			}
		}
			
	  });
	  
	  console.log(JSON.stringify(data))
	  	  
	  return data
  }
 
 
 
 module.exports = {
	convert:convert,
	findChild:findChild,
	removeNewline:removeNewline,
 }
 