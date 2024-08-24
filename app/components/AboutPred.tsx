import React from 'react'

interface TableProps {
    parameters: string[];
    values: string[];
  }

const AboutPred: React.FC<TableProps> = ({parameters = ['', '', ''], values = ['', '', '']}) => {
    
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table bg-base-200">
          {/* head */}
          <thead>
            <tr>
              <th colSpan={3} className="text-center">Accuracy Parameters</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
                <td>{parameters[0]}</td>
                <td>{values[0]}</td>
            </tr>
            {/* row 2 */}
            <tr>
                <td>{parameters[1]}</td>
                <td>{values[1]}</td>
            </tr>
            {/* row 3 */}
            <tr>
                <td>{parameters[2]}</td>
                <td>{values[2]}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AboutPred
