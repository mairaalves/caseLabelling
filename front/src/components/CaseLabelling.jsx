import React, { useState, useEffect } from 'react';
import Button from './Button';
import './CaseLabelling.css';

const CaseLabelling = () => {
	const [conditionId, setConditionId] = useState('');
	const [caseToLabel, setCaseToLabel] = useState({});
	const [conditions, setConditions] = useState([]);
	const [startTime, setStartTime] = useState(new Date());
	const token = sessionStorage.getItem('token');
	const headers = {
		'Content-Type': 'application/json',
		'x-access-token': token
	};

	const getCase = () => {
		fetch('http://localhost:5000/case', {headers})
			.then(res => res.json())
			.then(res => {
				if(res) {
					setCaseToLabel(res)
					setStartTime(new Date())
				}
			})
	}

	const getConditions = () => {
		fetch('http://localhost:5000/condition', {headers})
			.then(res => res.json())
			.then(res => setConditions(res))
	}

	const saveCase = () => {
		const endTime = new Date();
		const user = JSON.parse(sessionStorage.getItem('user'));

		const body = {
			label: conditionId,
			doctorId: user.id,
			timeToLabel: ((endTime.getTime() - startTime.getTime())/1000).toFixed(0)
		}

		if(caseToLabel._id) {
			return fetch(`http://localhost:5000/case/${caseToLabel._id}`, {
				method: "PUT",
				body: JSON.stringify(body),
				headers
			}).then(res => {
				if(res.status === 200) getCase();
			}).catch(err=>console.log(err))
		}
	}

	useEffect(() => {
		getCase();
		getConditions();
	}, []);

	return (
		<div className="content__container">
			<article className="content">
				<p>Please Review this Case</p>
				{caseToLabel.text
					? <p>{caseToLabel.text}</p>
					: <p>There are no cases to label right now.</p>}
			</article>

			<article className="content">
				<p>Select condition</p>
				<div className="list__container">
					<ul>
						{conditions.map(condition => (
							<li className={conditionId === condition.ICD_10 ? "selected" : ""} onClick={() => setConditionId(condition.ICD_10)} key={condition.ICD_10}>{`${condition.ICD_10} - ${condition.ICD_10_Description}`}</li>
						))}
					</ul>
				</div>
				<div className="content__actions"><Button onClickFunc={() => saveCase()} text="Next case" /></div>
			</article>
		</div>
	);
}

export default CaseLabelling;