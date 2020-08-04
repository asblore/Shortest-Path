import React, { Component } from 'react';
import Grid from './Grid.jsx';

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: 30,
			columns: 30,
			grid: [],
			s: [],
			d: [],
			result: ''
		};
	
	}

	componentDidMount=()=>{
		this.reset();
	}

	path=()=> {
	   const {grid,rows,columns,s,d} = this.state;
	   
	   if(s.length===0||d.length===0)
	   {
		 alert("Choose source and destination first");
		 return;
	   }

	   let vis=new Array(rows);
	   let par=new Array(rows);
	   let src=s;
	   let i,j;
	   for(i=0;i<rows;++i)
	   {
		 vis[i]=new Array(columns);
		 par[i]=new Array(columns);
	   }

	   for(i=0;i<rows;++i)
	   for(j=0;j<columns;++j)
	   {
		 vis[i][j]=0;
		 par[i][j]={x:-1,y:-1};
		 
		 if(grid[i][j]===1)
		 vis[i][j]=1;
	   }

	   vis[src[0]][src[1]]=1;
	   let q=[src];
	   while(q.length!==0)
	   {
		 src=q.shift();
		 i=src[0];
		 j=src[1];
		 if(i===d[0]&&j===d[1])
		 break;

		 if((i-1)>=0&&vis[i-1][j]===0)
		 {
			vis[i-1][j]=1;
			par[i-1][j]={x:i,y:j};  
			q.push([i-1,j]);
		 }
		 if((i+1)<rows&&vis[i+1][j]===0)
		 {
			vis[i+1][j]=1;
			par[i+1][j]={x:i,y:j};
			q.push([i+1,j]); 
		 }
		 if((j-1)>=0&&vis[i][j-1]===0)
		 {
			vis[i][j-1]=1;
			par[i][j-1]={x:i,y:j};
			q.push([i,j-1]); 
		 }
		 if((j+1)<columns&&vis[i][j+1]===0)
		 {
			vis[i][j+1]=1;
			par[i][j+1]={x:i,y:j};
			q.push([i,j+1]); 
		 }
	   }

	   if(par[d[0]][d[1]].x===-1&&par[d[0]][d[1]].y===-1)
	   {
          this.setState({
			  result:'Path Not Found!'
		  }); 
	   }
	   else
	   {
		  let t1,t2; 
		  i=par[d[0]][d[1]].x;
		  j=par[d[0]][d[1]].y;
		  while(!(i===s[0]&&j===s[1]))
		  {
			 grid[i][j]=4; 
			 t1=i;
			 t2=j;
			 i=par[t1][t2].x;
			 j=par[t1][t2].y;
		  }

		  this.setState({
			grid:grid,  
			result:'Path Found!'
		}); 
	   }
	}

	randomize=()=> {
		const { grid,rows,columns,s,d } = this.state;
		if(s.length===0)
		alert("First select source and destination. Then click this button.");
		else if(d.length===0)
		alert("First select destination. Then click this button.");
		else
		{
		  for (let i = 0; i < rows; i++)
		  {
		    for (let j = 0; j < columns; j++) 
		    {
			  if(!((i===s[0]&&j===s[1])||(i===d[0]&&j===d[1]))) 
			  grid[i][j] = Math.round(Math.random());
		    }
		  }
		  this.setState({ grid:grid });
		}
	}

	
	toggleCell=(x, y)=> {
		const { grid,s,d } = this.state;
		if(s.length===0)
		{
		  grid[x][y]=2;
		  this.setState({ grid:grid,s:[x,y]});
		  alert("Source chosen! Now select destination.");
		}
		else if(d.length===0)
		{
			if(x===s[0]&&y===s[1])
			alert('Choose a destination different from source');
			else
			{
			  grid[x][y]=3;
			  this.setState({ grid:grid,d:[x,y]});
			  alert("Source and destination chosen! Now find the shortest path or make obstacles!");
			}
		}
		else
		{
		  if(!((x===s[0]&&y===s[1])||(x===d[0]&&y===d[1])))
		  {  	
		    grid[x][y] = grid[x][y] ? 0 : 1;
			this.setState({ grid:grid});
		  }
		}
	}

	reset=()=> {
		const { rows,columns } = this.state;
		let grid = new Array(rows);
		for(let i=0;i<rows;++i)
		grid[i]=new Array(columns);

		for (let i = 0; i < rows; i++) {
			for (let j = 0; j < columns; j++) {
				grid[i][j] = 0;
			}
		}
		this.setState({ grid:grid, s:[], d:[], result:'' });
	}

	render() {
		const { grid, columns, rows } = this.state;
		return (
			<div>
				<button onClick={this.path}>Generate Shortest Path</button>
				<button onClick={this.randomize}>Randomly create obstacles</button>
				<button onClick={this.reset}>Reset</button>
				<Grid
					grid={grid}
					columns={columns}
					rows={rows}
					onToggleCell={this.toggleCell}
				/>
				<p>{this.state.result}</p>
			</div>
		);
	}
}

export default Board;
