import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setFilters } from './filterSlice';
import { selectPopMinMax } from './selectPopMinMax';

const FilterComponent = () => {
    const dispatch = useDispatch();
    const filters = useSelector((state) => state.filter);
    const cities = useSelector((state) => state.cities.cities);

    const [nameInput, setNameInput] = useState(filters.name);
    const [popMin, setPopMin] = useState(filters.popMin);
    const [popMax, setPopMax] = useState(filters.popMax);

    const { globalMin, globalMax } = useSelector(selectPopMinMax);

    useEffect(() => {
        setPopMin(globalMin);
        setPopMax(globalMax);
    }, [globalMin, globalMax]);

    useEffect(() => {
        const timer = setTimeout(() => {
            dispatch(setFilters({ name: nameInput, popMin: popMin, popMax: popMax }));
        }, 200);
        return () => clearTimeout(timer);
    }, [nameInput, popMin, popMax, dispatch]);

    return (
        <div style={{
            padding: '10px',
            margin: '10px auto',
            borderRadius: '8px',
            maxWidth: '800px',
            textAlign: 'center'
        }}>
            <div>
                <label>
                    City Name:&nbsp;
                    <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    placeholder="Filter by name"
                    style={{ padding: '4px' }}
                    />
                </label>
            </div>
            <div style={{ marginTop: '10px' }}>
            <label>
                Population: {popMin} – {popMax}
            </label>
            <br />
            <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '5px' }}>
                <input
                type="range"
                min={globalMin}
                max={globalMax}
                value={popMin}
                onChange={(e) => setPopMin(parseInt(e.target.value))}
                />
                <input
                type="range"
                min={globalMin}
                max={globalMax}
                value={popMax}
                onChange={(e) => setPopMax(parseInt(e.target.value))}
                />
            </div>
            </div>
        </div>
    );
};

export default FilterComponent;