import useAPI from '@hooks/useAPI';
import {
    PaginationInterface,
    defaultPagination,
} from '@interface/global.interface';
import {
    ITestimonial,
    ITestimonialResponse,
} from '@interface/testimonial.interface';
import Pagination from '@ui/common/molecules/pagination/Pagination';
import Table from '@ui/common/organisms/table/Table';
import { useEffect, useState } from 'react';

const AdminTestimonialPage = () => {
    const { get } = useAPI<ITestimonialResponse>();
    const [testimonials, setTestimonials] = useState<ITestimonial[]>();
    const [refresh, setRefresh] = useState<boolean>(false);

    const [totalPages, setTotalPages] =
        useState<PaginationInterface>(defaultPagination);

    const headers = [
        'S.No.',
        'Full Name',
        'Rating',
        'Reviewer Location',
        'Testimonial',
        'Media',
        'Action',
    ];

    let index = 0;

    const fetchData = async () => {
        const response = await get({
            url: `/testimonial?page=${totalPages?.currentPage || 1}&perpage=${totalPages?.perpage}`,
        });
        console.log('🚀 ~ fetchData ~ admin:', response);
        if (response.status) setTestimonials(response?.data?.data);
    };

    useEffect(() => {
        fetchData();
    }, [refresh]);

    return (
        <div>
            <h1 className='custom-h'>Testimonials</h1>
            <Table
                headers={headers}
                data={testimonials as ITestimonial[]}
                renderRow={(item: ITestimonial) => (
                    <>
                        <td>{++index}</td>
                        <td>{item.fullName}</td>
                        <td>{item.rating}</td>
                        <td>{item.reviewerLocation}</td>
                        <td>{item.testimonial}</td>
                        <td>
                            <img src={item.media?.path} alt='' />
                        </td>
                        <td>
                            <span className='delete-icon'>Delete</span>
                        </td>
                    </>
                )}
            />

            {totalPages?.totalPages ? (
                <Pagination
                    setTotalPages={
                        setTotalPages as React.Dispatch<
                            React.SetStateAction<PaginationInterface>
                        >
                    }
                    pagination={totalPages ?? defaultPagination}
                    setRefresh={setRefresh}
                />
            ) : (
                <></>
            )}
        </div>
    );
};

export default AdminTestimonialPage;
