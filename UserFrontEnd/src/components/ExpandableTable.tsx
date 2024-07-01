import { Table, TableBody, TableCell, TableContainer, TableRow, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const ExpandableTable = () => {
    return (
        <>
            {/* Content Type */}
            <TableContainer sx={{ boxShadow: 'none', borderRadius: '0' }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ paddingBottom: '4px' }}>
                                <Accordion sx={{ boxShadow: 'none', borderRadius: '0' }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        Content Type
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableContainer>
                                            <Table>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>
                                                            <input type="checkbox" style={{ marginRight: '8px' }} />
                                                            Full Text
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <input type="checkbox" style={{ marginRight: '8px' }} />
                                                            Open Access
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <input type="checkbox" style={{ marginRight: '8px' }} />
                                                            Biography (1)
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <input type="checkbox" style={{ marginRight: '8px' }} />
                                                            Non-fiction (197)
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </AccordionDetails>
                                </Accordion>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Publication Year */}
            <TableContainer sx={{ boxShadow: 'none', borderRadius: '0' }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ paddingBottom: '4px' }}>
                                <Accordion sx={{ boxShadow: 'none', borderRadius: '0' }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        Publication Year
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableContainer>
                                            <Table>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>
                                                            <a href="#">All</a>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <a href="#">Last 5 years</a>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <a href="#">Last 10 years</a>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <a href="#">Last 25 years</a>
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </AccordionDetails>
                                </Accordion>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Author */}
            <TableContainer sx={{ boxShadow: 'none', borderRadius: '0' }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ paddingBottom: '4px' }}>
                                <Accordion sx={{ boxShadow: 'none', borderRadius: '0' }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        Author
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableContainer>
                                            <Table>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>
                                                            <a href="#">All</a>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <input type="checkbox" style={{ marginRight: '8px' }} />
                                                            William Shakespeare
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <input type="checkbox" style={{ marginRight: '8px' }} />
                                                            Jane Austen
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <input type="checkbox" style={{ marginRight: '8px' }} />
                                                            George Orwell
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </AccordionDetails>
                                </Accordion>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Categories */}
            <TableContainer sx={{ boxShadow: 'none', borderRadius: '0' }}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell sx={{ paddingBottom: '4px' }}>
                                <Accordion sx={{ boxShadow: 'none', borderRadius: '0' }}>
                                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                        Categories
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <TableContainer>
                                            <Table>
                                                <TableBody>
                                                    <TableRow>
                                                        <TableCell>
                                                            <a href="#">All</a>
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <input type="checkbox" style={{ marginRight: '8px' }} />
                                                            Computer Science
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <input type="checkbox" style={{ marginRight: '8px' }} />
                                                            Math
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <input type="checkbox" style={{ marginRight: '8px' }} />
                                                            Literature
                                                        </TableCell>
                                                    </TableRow>
                                                </TableBody>
                                            </Table>
                                        </TableContainer>
                                    </AccordionDetails>
                                </Accordion>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
}

export default ExpandableTable;
